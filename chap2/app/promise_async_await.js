const fs = require('fs');
const { resolve } = require('path');
// CommonJS
// import export ES Module
// NodeJS 14 thì mới support chuẩn ES Module
// Tuy nhiên, ta vẫn tuân theo chuẩn cũ vì rất nhiêu thư viện đang chuẩn cũ

// Java
// console.log('1');
// fs.readFile(
//   'hello.txt', 
//   { encoding: 'utf-8'},
//   (err, data) => {
//     if (err) return console.log(err);
//     console.log(data);
//
//   }
// ); // thread, go function() {}
// console.log('2');

// fs.promises.readFile(
//   'helloa.txt'
// ).then(data => {
//   console.log(data.toString());
// }).catch(err => {
//   console.log('vao day');
//   console.log(err);
// })

// const wait = (timeSec) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, timeSec * 1000)
//   });
// }

const wait = (timeSec) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeSec * 1000)
  });
}

// console.log(1);
// wait(3).then(() => console.log('after 3s'));

// const readFile = (filePath) => {
//   return new Promise((resolve, reject)=> {
//     fs.readFile(filePath, (err, data) => {
//       if (err) reject(err);

//       resolve(data)
//     })
//   })
// }

// readFile('helloa.txt')
//   .then(data => console.log(data.toString()))
//   .catch(err => console.log(err));

// async await => sugar syntax
// node 8
// async function readFileSync() {
//   // await promise
//   try {
//     const data = await fs.promises.readFile('helloa.txt'); 
//     // dừng cho đến khi promise thành công hoặc thất bại
//     return data; // resolve (data)

//   } catch (err) {
//     throw err; // reject (err)
//   }
// }
// kết quả trả về của hàm async là một promise

// readFileSync()
//   .then(data => console.log(data))
//   .catch(err => console.log('1', err));


// viết một hàm trả về một promise, chạy sau 10s sẽ trả lỗi (Rejected)

// const errAfterTenSecond = () => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject("Lỗi")
  //   }, 10000)
  // })
// };

// const errAfterTenSecond = async () => {
//   await wait(10);

//   return "Success";
  // throw "Lỗi"
// };

const successAfterTenSecond = async () => {
  await wait(1);

  return 1;
  // throw "Lỗi"
};
// async trả về promise

(async () => {
  try {
    const data = await successAfterTenSecond() // 10s chạy
    console.log(data);
  } catch (err) {
    console.log(err); // lỗi
  }
})() //Immediately invoked function expression