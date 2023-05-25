import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(post.updatedAt).toLocaleString()}</p>
          <p>Likes: {post.likes}</p>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default Post;
