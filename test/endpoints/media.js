const express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var images = require('../data/images.json');

router.put('/upload', fileUpload(), (req, res) => {
    // console.log('Request Headers', req.headers);
    console.log('Request Files', req.files);
    console.log('Request Body', req.body);

    setTimeout(() => {

        const now = new Date().getMilliseconds();
        const error = now % 3 === 0;
        const randomImage = images[Math.floor(Math.random() * images.length)];

        res.send({
            resultCode: error ? 0 : 1,
            resultData: randomImage,
            errorDisplay: false,
            errorMessage: error ? 'Hello, this is just a testing error. There are 33.3% requests will return this error.' : ''
        });

    }, Math.random() * 6000);
});

module.exports = router;