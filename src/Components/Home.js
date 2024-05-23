import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);

  // Fetch all posts
  const fetchPosts = () => {
    fetch('http://localhost:5000/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  // Fetch a specific post by ID
  const fetchPost = (postId) => {
    fetch(`http://localhost:5000/api/post/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post:', error));
  };


  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      document.title = post.title;
      document.querySelector('meta[name="description"]').setAttribute('content', post.description);
      document.querySelector('meta[property="og:title"]').setAttribute('content', post.title);
      document.querySelector('meta[property="og:description"]').setAttribute('content', post.description);
      document.querySelector('meta[property="og:image"]').setAttribute('content', post.image);
    }
  }, [post]);

  const renderPostContent = () => {
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    );
  };

  return (
    <div>
      {!id ? (
        <div>
          <h2>All Posts</h2>
          <div className="card-container">
            {posts.map(post => (
              <div key={post.id} className="card">
                <Link to={`/post/${post.id}`}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <img src={post.image} alt={post.title} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderPostContent()
      )}
    </div>
  );
};

export default Home;
