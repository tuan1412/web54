# Buổi 10
- Upload file lên server
- Upload file lên cloud storage (firebase storage)

## Mở đầu
Upload và lưu trữ file là tác vụ phổ biến trong bất kì một web app nào. Để upload, client sẽ gửi dữ liệu ảnh lên với body dạng *form data*. Để lưu trữ, server sẽ chọn một trong 3 cách sau:
- Lưu vào database :no_entry:
- Lưu vào disk của server :warning:
- Lưu vào cloud storage :white_check_mark:

Cách 1 không dùng => Database không thiết kế tốt để lưu trữ dạng nhị phân (base64), => hiệu năng kém, truy vấn chậm, cost cho dung lượng database đắt hơn nhiều dung lượng ổ đĩa lưu trữ

Cách 2 dùng tạm => Lưu file vào trong disk của server (server api). Cách này có hạn chế là khi client load ảnh, server api bị chiếm hết băng thông => ko thực hiện dc nhiều task vụ, ngoài ra cần có cơ chế backup file hợp lý. Để hoàn thiện một server lưu trữ file như vậy tốn nhiều công sức.

Ngoài ra, trong khuôn khổ lớp học, cuối khoá sẽ demo lên heroku. Với phiên bản free của heroku, thì sau một khoảng thời gian (tầm 2 tiếng), các file tĩnh (ngoài code) sẽ bị mất hết => Ko còn ảnh đã lưu

Cách 3 là cách sử dụng thường xuyên và phổ biến nhất trong thực tế. Cost cloud storage như Firebase, Google Storage, S3, Cloudinary có giá rất hợp lý. Ở đây, để làm quen ta chọn Firebase (có 5GB lưu trữ miễn phí)

## Lưu trữ trên disk server
Để upload file lên server, ta cần đọc được dữ liệu file client gửi lên. Như đã giới thiệu, client gọi lên server với body là *form-data*, khác với dạng json như API.

Do vậy, đoạn code app.use(express.json) ko sử dụng được nữa => cần thư viện khác. Project sẽ sử dụng [multer](https://github.com/expressjs/multer#readme)

Khi sử dụng middleware của multer, thông tin của file sẽ được nằm trong biến req.file
```
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('file'), (req, res) => {
  res.send(req.file)
});
```

Đoạn code trên có ý nghĩa uploads một ảnh vào thư mục uploads. Khi này, để sử dụng ảnh, ta chỉ cần mở thư mục uploads thành public
```
app.use(express.static('uploads');
```

`BTVN: Hoàn thiện task vụ trên với việc hạn chế các loại file upload nhất định (Ví dụ chỉ cho upload file ảnh)`

## Upload lên Firebase
Ta vẫn sử dụng thư viện multer để đọc đầu vào. Tuy nhiên thay vì upload lên storage, ta sẽ đẩy file lên cloud.
Khi sử dụng multer.memoryStorage() => dữ liệu file sẽ được lưu trữ thành dạng nhị phân và nằm trong req.file.buffer => Ta sẽ lấy buffer này để upload lên cloud

```
const { initializeApp } = require('firebase/app');
const { getDownloadURL, getStorage, ref, uploadBytes } = require('firebase/storage');

const memoryStorage = multer.memoryStorage()
const uploadWithMemoryStorage = multer({ storage: memoryStorage })

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const firebaseStorage = getStorage(app);


router.post('/firebase', uploadWithMemoryStorage.single('file'), async (req, res) => {
  const imageRef = ref(firebaseStorage, req.file.originalname);

  const data = await uploadBytes(imageRef, req.file.buffer, {
    contentType: req.file.mimetype,
  });

  const path = await getDownloadURL(data.ref);
  res.send(path);
});
```