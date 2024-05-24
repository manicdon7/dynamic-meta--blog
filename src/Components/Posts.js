import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const urlvar = "https://dynamic-meta-blog.vercel.app/";

  useEffect(() => {
    fetch(`${urlvar}api/post/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setPost(data);

          // Update meta tags for social media preview
          document.title = data.title;

          const ogTitleMeta = document.querySelector('meta[property="og:title"]');
          const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
          const ogImageMeta = document.querySelector('meta[property="og:image"]');

          const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
          const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
          const twitterImageMeta = document.querySelector('meta[name="twitter:image"]');

          if (ogTitleMeta) ogTitleMeta.setAttribute('content', data.title);
          if (ogDescriptionMeta) ogDescriptionMeta.setAttribute('content', data.description);
          if (ogImageMeta) ogImageMeta.setAttribute('content', data.image);

          if (twitterTitleMeta) twitterTitleMeta.setAttribute('content', data.title);
          if (twitterDescriptionMeta) twitterDescriptionMeta.setAttribute('content', data.description);
          if (twitterImageMeta) twitterImageMeta.setAttribute('content', data.image);
          
          console.log("Meta tags updated");
        } else {
          console.error('Post data not found');
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
