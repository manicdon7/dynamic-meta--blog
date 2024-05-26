const express = require('express');
const { getPostById } = require('./posts');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors("https://dynamic-meta-blog-client.vercel.app/"));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '..', 'build')));

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

    const htmlFilePath = path.join(__dirname, '..', 'build', 'index.html');
    fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Inject meta tags into the HTML content
        const updatedHtmlData = htmlData
            .replace(/%OG_TITLE%/g, post.title)
            .replace(/%OG_DESCRIPTION%/g, post.description)
            .replace(/%OG_IMAGE%/g, post.image);

        console.log(updatedHtmlData);
        res.send(updatedHtmlData);
    });
});

// Serve the main HTML file for all non-API routes
app.get('*', (req, res) => {
    const htmlFilePath = path.join(__dirname, '..', 'build', 'index.html');
    res.sendFile(htmlFilePath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
