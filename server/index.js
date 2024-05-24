const express = require('express');
const { getPostById } = require('./posts');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin: 'https://dynamic-meta-blog-client.vercel.app',
}));

// Serve static files from the build directory
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

app.use((req, res, next) => {
    console.log('Accessibility event detected:', req.method, req.url);
    next();
});

app.get('/api/posts', (req, res) => {
    console.log('Fetching all posts');
    res.json(getPostById());
});

app.get('/api/post/:id', (req, res) => {
    const postId = req.params.id;
    console.log('Requested post ID:', postId);

    const post = getPostById(postId);
    console.log('Retrieved post:', post);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    // Read the index.html template from the build directory
    const indexPath = path.resolve(__dirname, '..', 'client', 'build', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(500).end();
        }

        const updatedHtmlData = htmlData
            .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${post.title}"`)
            .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${post.description}"`)
            .replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${post.image}"`)
            .replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${post.title}"`)
            .replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${post.description}"`)
            .replace(/<meta name="twitter:image" content=".*?"/, `<meta name="twitter:image" content="${post.image}"`);

        res.send(updatedHtmlData);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
