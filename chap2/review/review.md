## Làm quen NodeJS
NodeJS là môi trường chạy của JS trên máy tính (!== trình duyệt)
NodeJS single thread, non blocking io, async (dựa vào cơ chế event loop)
Các cách để xử lý bất đồng bộ (3 cách)
- callback
- promise
- async await

Callback truyền func là parameter của func khác, khi nào thực hiện hàm này thì chạy hàm callback. vd
```
setTimeout(() => { console.log('xong') }, 3000)

fs.readFile('file.txt', (err, data) => {
  // xử lý dữ liệu
  if (err) {

  }
  fs.writeFile('file.txt', (err) => {
    //
    // một đống callback ở đây nữa
    if (err) {

    }

  })
})
// => callback hell
```

Promise
```
const promises = new Promise((resolve, reject) => {
  let isSuccess;
  if (isSuccess) {
    resolve({ isSuccess });
  } else {
    reject(false);
  }
})
// promises.then(data => console.log(data)).catch()
// chain promise
```
```
  fs.promises.readFile('hello.txt')
    .then(data => {
      return fs.promises.writeFile('hello.txt', JSON.stringfy(data))
    )})
    .then(data => {

    })
    .then()
    .catch(err => {

    });
    // promise hell
```

Async - Await
await là phải sử dụng trong function chứa async

await là await promises

async trả về một promise
```
  (async () => {
    try {
      try {
        const data = await fs.promises.readFile('hello.txt');
      } catch (err) {
        //
      }
      console.log('data');
      // xử lý dữ liệu
      await fs.promises.writeFile('hello.txt');
      // ....
    } catch (err) {
      // 
    }
    
    /// 
  })()
  // await Promise.all()
  // Promise.any(); // NodeJS bản rất cao
```
Simple project về NodeJS - Module (3 loại)
- Core module, standard module (nodejs có sẵn rồi), vd: fs, http
- Local module (code của mình, tách ra file) => thực hiện 2 bước
B1: xuất ra module, module.exports (CommonJS) !== chuẩn trình duyệt (ES Module)
B2: lấy vào require()
- Third party module (npmjs)
npm install => node_modules => require() lấy node module ra



