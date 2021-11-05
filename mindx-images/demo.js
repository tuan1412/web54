const mongoose = require('mongoose');

// post { id, imageUrl, title, description, createdBy, createdAt, updatedAt }

// schema là định dạng của document, chỉ ứng với mongoose
const PostSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdBy: String,
}, {
  timestamps: true
});

const PostModel = mongoose.model('Post', PostSchema)

async function main() {
  // Dùng JS để kết nối tới mongodb server
  // Tương đương dùng fetch bên trình duyệt để connect tới server app
  await mongoose.connect('mongodb://localhost:27017/mindx-demo')
  console.log('MongoDB connected');
  const newPost = {
    title: 'Chap 4',
    description: 'Hi',
    createdBy: 'tuan@gmai.com',
    imageUrl: 'http://test.png'
  }
  // await PostModel.create(newPost);
  const posts = await PostModel.find();
  console.log(posts)
}

main();