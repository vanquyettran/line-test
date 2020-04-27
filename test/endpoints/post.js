const express = require('express');
var router = express.Router();
var {getPost} = require('../data/posts');

router.post('/upload', (req, res) => {
    // console.log('Request Headers', req.headers);
    console.log('Request Body', req.body);

    setTimeout(() => {
        const now = new Date().getMilliseconds();
        const error = now % 3 === 0;

        res.send({
            resultCode: error ? 0 : 1,
            resultData: getPost(),
            errorDisplay: error,
            errorMessage: error ? 'Hello, this is just a testing error. There are 33.3% requests will return this error.' : ''
        });

    }, Math.random() * 3000);
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