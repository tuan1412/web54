const fs = require('fs');
const uuid = require('uuid');
/*
  {
    imageUrl: string,
    title: string,
    description: string,
    createdBy: string
  }
*/
// trả về một promises ko có reject
const getAllPosts = async () => {
  try {
    const jsonPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8'});
    const posts = JSON.parse(jsonPosts);
    return posts; // resolve posts
  } catch (err) {
    console.log(err);
    return []; // resolve []
  }
}

const getPost = async (id) => {
  try {
    const jsonPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8'});
    const posts = JSON.parse(jsonPosts);

    const foundPost = posts.find(post => post.id === id);

    return foundPost ? foundPost : null; // resolve foundPost
  } catch (err) {
    console.log(err);
    return null; // resolve []
  }
}

const createPost = async (dataPost) => {
  try {
    const jsonPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8'});
    const posts = JSON.parse(jsonPosts);

    const newPost = {
      id: uuid.v1(),
      ...dataPost
    }

    const newPosts = [...posts, newPost];
    await fs.promises.writeFile(
      'posts.json', 
      JSON.stringify(newPosts)
    );

    return newPost; // resolve foundPost
  } catch (err) {
    console.log(err);
    return null; // resolve []
  }
}

const updatePost = async (id, dataUpdate) => {
  try {
    const jsonPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8'});
    const posts = JSON.parse(jsonPosts);

    // b1: tìm vị trí
    let foundIndex = posts.findIndex(post => post.id === id);

    if (foundIndex !== -1) {
      // b2: update
      posts[foundIndex] = {
        ...posts[foundIndex],
        ...dataUpdate
      }
      console.log(posts);

      // b3: save

      await fs.promises.writeFile(
        'posts.json', 
        JSON.stringify(posts)
      );
      return posts[foundIndex];
    }
    return null;

  } catch (err) {
    console.log(err);
    return null; // resolve []
  }
}

const deletePost = async (id) => {
  try {
    const jsonPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8'});
    const posts = JSON.parse(jsonPosts);

    const newPosts = posts.filter(post => post.id !== id);
    await fs.promises.writeFile(
      'posts.json', 
      JSON.stringify(newPosts)
    );
    
    return true;

  } catch (err) {
    console.log(err);
    return false; // resolve []
  }
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}