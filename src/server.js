const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a blog post schema
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

const Post = mongoose.model('Post', postSchema);

// API endpoints
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().limit(10);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({ title, description });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
