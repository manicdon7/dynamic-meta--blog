const posts = [
    {
        id: 1,
        title: "Post 1",
        description: "Description for Post 1",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/home.png?raw=true"
    },
    {
        id: 2,
        title: "Post 2",
        description: "Description for Post 2",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/Screenshot%202024-05-15%20115209.png?raw=true"
    },
    {
        id: 3,
        title: "Post 3",
        description: "Description for Post 3",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/home.png?raw=true"
    },
    {
        id: 4,
        title: "Post 4",
        description: "Description for Post 4",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/Screenshot%202024-05-15%20115211.png?raw=true"
    },
    {
        id: 5,
        title: "Post 5",
        description: "Description for Post 5",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/home.png?raw=true"
    },
    {
        id: 6,
        title: "Post 6",
        description: "Description for Post 6",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/home.png?raw=true"
    },
    {
        id: 7,
        title: "Post 7",
        description: "Description for Post 7",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/Screenshot%202024-05-15%20115214.png?raw=true"
    },
    {
        id: 8,
        title: "Post 8",
        description: "Description for Post 8",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/Screenshot%202024-05-15%20115215.png?raw=true"
    },
    {
        id: 9,
        title: "Post 9",
        description: "Description for Post 9",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/Screenshot%202024-05-15%20115216.png?raw=true"
    },
    {
        id: 10,
        title: "Post 10",
        description: "Description for Post 10",
        image: "https://github.com/manicdon7/ezpass/blob/master/front/public/Screenshot%202024-05-15%20115217.png?raw=true"
    }
];

const getPostById = (id) => {
    const postId = parseInt(id);
    return posts.find(post => post.id === postId) || null;
};

module.exports = {
    getPostById
};
