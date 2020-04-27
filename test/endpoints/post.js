const express = require('express');
var router = express.Router();
var posts = require('../data/posts.json');
var images = require('../data/images.json');

router.post('/upload', (req, res) => {
    // console.log('Request Headers', req.headers);
    console.log('Request Body', req.body);

    setTimeout(() => {

        const now = new Date().getMilliseconds();
        const error = now % 3 === 0;

        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        randomPost['images'] = shuffle(images).splice(0, 8);
        randomPost['updatedAt'] = new Date().getTime();

        res.send({
            resultCode: error ? 0 : 1,
            resultData: randomPost,
            errorDisplay: false,
            errorMessage: error ? 'Hello, this is just a testing error. There are 33.3% requests will return this error.' : ''
        });

    }, Math.random() * 6000);
});


/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

module.exports = router;