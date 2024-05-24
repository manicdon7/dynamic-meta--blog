const express = require('express');
const { getPostById } = require('./posts');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors("https://dynamic-meta-blog-client.vercel.app/"));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname,'..', 'build')));

// Middleware to handle accessibility events
app.use((req, res, next) => {
    console.log('Accessibility event detected:', req.method, req.url);
    next();
});

// Endpoint to fetch all posts
app.get('/api/posts', (req, res) => {
    console.log('Fetching all posts');
    const posts = getPostById();
    res.json(posts);
});

// Endpoint to fetch a specific post by ID and serve HTML with updated meta tags
app.get('/api/post/:id', (req, res) => {
    const postId = req.params.id;
    console.log('Requested post ID:', postId);

    const post = getPostById(postId);
    console.log('Retrieved post:', post);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    // Generate the HTML content with the post data for meta tags
    const updatedHtmlData = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <!-- Open Graph meta tags -->
        <meta property="og:title" content="${post.title}" />
        <meta property="og:description" content="${post.description}" />
        <meta property="og:image" content="${post.image}" />
        <!-- Twitter Card meta tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${post.title}" />
        <meta name="twitter:description" content="${post.description}" />
        <meta name="twitter:image" content="${post.image}" />
        <link rel="manifest" href="/manifest.json" />
        <title>${post.title}</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script defer="defer" src="/static/js/main.232429fd.js"></script>
        <link href="/static/css/main.77440057.css" rel="stylesheet">
    </body>
    </html>
    `;

    res.send(updatedHtmlData);
});

// Serve the main HTML file for all non-API routes
app.get('*', (req, res) => {
    const htmlFilePath = path.join(__dirname,'..', 'build', 'index.html');
    res.sendFile(htmlFilePath);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
