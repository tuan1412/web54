const express = require('express');

const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
})

app.listen(80);