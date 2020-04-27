var {getRandomImages} = require('./images');

function getPosts() {
    return [
        {
            "id": 10000001,
            "type": "IMAGE",
            "status": "DRAFTED",
            "scheduledTime": null,
            "images": getRandomImages(),
            "createdAt": 1588007367938,
            "updatedAt": new Date().getTime()
        },
        {
            "id": 10000002,
            "type": "IMAGE",
            "status": "PUBLISHED",
            "scheduledTime": null,
            "images": getRandomImages(),
            "createdAt": 1588007367938,
            "updatedAt": new Date().getTime()
        },
        {
            "id": 10000003,
            "type": "IMAGE",
            "status": "PUBLISHED",
            "scheduledTime": 2020870800000,
            "images": getRandomImages(),
            "createdAt": 1588007367938,
            "updatedAt": new Date().getTime()
        },
        {
            "id": 10000004,
            "type": "IMAGE",
            "status": "DRAFTED",
            "scheduledTime": 1820870800000,
            "images": getRandomImages(),
            "createdAt": 1588007367938,
            "updatedAt": new Date().getTime()
        }
    ];
}

function getPost(index = 3) {
    return getPosts()[index];
}

function getRandomPost() {
    const posts = getPosts();
    return posts[Math.floor(Math.random() * posts.length)];
}

module.exports = {
    getRandomPost,
    getPost
};
