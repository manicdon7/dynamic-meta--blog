import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const urlvar= "http://localhost:5000/"
  useEffect(() => {
    fetch(`${urlvar}api/post/${id}`)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const ogTitleMeta = doc.querySelector('meta[property="og:title"]');
        const ogDescriptionMeta = doc.querySelector('meta[property="og:description"]');
        const ogImageMeta = doc.querySelector('meta[property="og:image"]');
        
        if (ogTitleMeta && ogDescriptionMeta && ogImageMeta) {
          setPost({
            title: ogTitleMeta.content,
            description: ogDescriptionMeta.content,
            image: ogImageMeta.content
          });
        } else {
          console.error('Meta tags not found in HTML response');
        }
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <img src={post.image} alt={post.title} />
    </div>
  );
}

export default Post;
