import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const urlvar = "https://dynamic-meta-blog-client.vercel.app/";

  useEffect(() => {
    fetch(`${urlvar}api/post/${id}`)
      .then(response => response.text())
      .then(html => {
        // Log the received HTML for reference
        console.log(html);

        // Create a new HTML element and set its innerHTML to the received HTML
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        // Extract meta tags from the received HTML
        const ogTitleMeta = tempElement.querySelector('meta[property="og:title"]');
        const ogDescriptionMeta = tempElement.querySelector('meta[property="og:description"]');
        const ogImageMeta = tempElement.querySelector('meta[property="og:image"]');
        
        const twitterTitleMeta = tempElement.querySelector('meta[name="twitter:title"]');
        const twitterDescriptionMeta = tempElement.querySelector('meta[name="twitter:description"]');
        const twitterImageMeta = tempElement.querySelector('meta[name="twitter:image"]');
        
        if (ogTitleMeta && ogDescriptionMeta && ogImageMeta && twitterTitleMeta && twitterDescriptionMeta && twitterImageMeta) {
          setPost({
            title: ogTitleMeta.content,
            description: ogDescriptionMeta.content,
            image: ogImageMeta.content
          });

          // Update document title
          document.title = ogTitleMeta.content;

          // Update Open Graph meta tags
          document.querySelector('meta[property="og:title"]').setAttribute('content', ogTitleMeta.content);
          document.querySelector('meta[property="og:description"]').setAttribute('content', ogDescriptionMeta.content);
          document.querySelector('meta[property="og:image"]').setAttribute('content', ogImageMeta.content);
          
          // Update Twitter Card meta tags
          document.querySelector('meta[name="twitter:title"]').setAttribute('content', twitterTitleMeta.content);
          document.querySelector('meta[name="twitter:description"]').setAttribute('content', twitterDescriptionMeta.content);
          document.querySelector('meta[name="twitter:image"]').setAttribute('content', twitterImageMeta.content);
          console.log("meta changed")
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
