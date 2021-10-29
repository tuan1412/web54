const fs = require('fs'); // xử lý file
const users = [
  { id: 1, username: 'tuan', password: '123456'},
  { id: 2, username: 'binh', password: '1234526' },
  { id: 3, username: 'ha', password: '1234536' }
];

// users => string
fs.writeFile(
  'users.txt', 
  JSON.stringify(users),
  {
    flag: 'a'
  },
  (err) => {
    console.log(err)
  }
)

// hàm để nối đuôi file 
// fs.appendFile
// giữ nguyên wrtiteFile chuyển cơ chế ghi đè thành nối đuôi

// CRUD => files
const addUser = async (user) => {
  try {
    const stringUsers = await fs
    .promises.readFile('users.json', { encoding: 'utf-8' });

    const users = JSON.parse(stringUsers);
    const newUsers = [
    ...users,
    { id: users.length + 1, ...user }
    ];
    await fs.promises.writeFile('users.json', JSON.stringify(newUsers));
  } catch (err) {
    console.log(err);
  }
}
addUser({ username: 'ha', password: '123'});

const readUsers = () => {

}

const readUser = (id) => {
  
}

const updateUser = (id, dataUpdate) => {
  
}

const deleteUser = (id) => {
  
}