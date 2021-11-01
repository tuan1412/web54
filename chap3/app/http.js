const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req, res) => {

  const demoHTML = await fs.promises.readFile('demo.html');
  res.write(demoHTML);

  res.end();
})

server.listen(8080);

// tạo một cái app chạy ở máy tính chúng ta
// lắng nghe http request gọi đến cổng này không
// tương đương addEventListener('click', () => {})
// máy thì có rất nhiều port, hơn 50000
// tìm hiểu http, email, ftp
