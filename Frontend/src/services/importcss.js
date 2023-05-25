import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const MyComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">My Blog Posts</h2>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}
      <button className="button">Add New Post</button>
    </div>
  );
};

export default MyComponent;
