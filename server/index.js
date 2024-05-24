const express = require('express');
const path = require('path');
const fs = require('fs');
const { getPostById } = require('./posts');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({origin:"https://dynamic-meta-blog-client.vercel.app/"}));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Endpoint to fetch all posts
app.get('/api/posts', (req, res) => {
    console.log('Fetching all posts');
    res.json(getPostById()); // Assuming getPostById returns all posts if called without arguments
});

// Endpoint to fetch a specific post by ID
app.get('/api/post/:id', (req, res) => {
    const postId = req.params.id;
    console.log('Requested post ID:', postId);

    // Assuming getPostById function returns the post data
    const post = getPostById(postId);
    console.log('Retrieved post:', post);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    // Read the index.html template from the build directory
    const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(500).end();
        }

        // Replace meta tags with post data
        const updatedHtmlData = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Web site created using create-react-app" />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <!-- Add Open Graph meta tags -->
            <meta property="og:title" content="${post.title}" />
            <meta property="og:description" content="${post.description}" />
            <meta property="og:image" content="${post.image}" />
            <!-- End of Open Graph meta tags -->
            <!-- Add Twitter Card meta tags -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${post.title}" />
            <meta name="twitter:description" content="${post.description}" />
            <meta name="twitter:image" content="${post.image}" />
            <!-- End of Twitter Card meta tags -->
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <title>React App</title>
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
        </body>
        </html>
        `;

        // Write the updated HTML data to the public/index.html
        const publicIndexPath = path.resolve(__dirname, '..', 'public', 'index.html');
        fs.writeFile(publicIndexPath, updatedHtmlData, 'utf8', err => {
            if (err) {
                console.error('Error writing updated HTML file', err);
                return res.status(500).end();
            }
            // Send the updated HTML file as a response
            res.sendFile(publicIndexPath);
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
