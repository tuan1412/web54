const { initializeApp } = require('firebase/app');
const { getDownloadURL, getStorage, ref, uploadBytes } = require('firebase/storage');
const HttpError = require('../../common/httpError');

const uploadToDisk = (req, res) => {
  res.send({
    success: 1,
    data: req.file.path
  });
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const firebaseStorage = getStorage(app);

const buildFileName = (originalname) => {
  // png.png
  const ext = originalname.split('.').pop();

  const fileName = originalname.substring(0, originalname.indexOf(ext) - 1);

  return `${fileName}-${Date.now()}.${ext}`;
}

const whiteList = ['png', 'jpeg'];

// viết lại thành 1 middleware
const preventUploadFileType = originalname => {
  const ext = originalname.split('.').pop();

  if (!whiteList.includes(ext)) {
    throw new HttpError('not support file type', 400)
  }
}

const uploadToCloud = async (req, res) => {
  const file = req.file;

  const { buffer, originalname, mimetype } = file;

  preventUploadFileType(originalname);

  const imageRef = ref(firebaseStorage, buildFileName(originalname));

  const data = await uploadBytes(imageRef, buffer, {
    contentType: mimetype
  })

  const downloadUrl = await getDownloadURL(data.ref);
  res.send({
    success: 1,
    data: downloadUrl
  })
}

module.exports = {
  uploadToDisk,
  uploadToCloud
}