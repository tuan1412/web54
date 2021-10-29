const fs = require('fs');

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

// xuất module, CommonJS
// module.exports = addUser; // export một function

module.exports = {
  addUser
}; // export một object