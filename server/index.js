const express = require('express');
const { getPostById, getAllPosts } = require('./posts');
const cors = require('cors');
const path = require('path');
const prerender = require('prerender-node');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors("https://dynamic-meta-blog-client.vercel.app/"));

// Configure Prerender.io middleware
app.use(prerender.set('prerenderToken', 'RbvwzJQyLxadqmgvHGpg'));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to handle accessibility events
app.use((req, res, next) => {
    console.log('Accessibility event detected:', req.method, req.url);
    next();
});

// Endpoint to fetch all posts
app.get('/api/posts', (req, res) => {
    console.log('Fetching all posts');
    const posts = getAllPosts();
    res.json(posts);
});

// Endpoint to fetch a specific post by ID
app.get('/api/post/:id', (req, res) => {
    const postId = req.params.id;
    console.log('Requested post ID:', postId);

    const post = getPostById(postId);
    console.log('Retrieved post:', post);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    res.json(post);
});

// Serve the main HTML file for all non-API routes
app.get('*', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'build', 'index.html');
    res.sendFile(htmlFilePath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
