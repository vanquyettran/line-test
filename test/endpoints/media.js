const express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var {getRandomImage} = require('../data/images');

router.put('/upload', fileUpload(), (req, res) => {
    console.log('Request Files', req.files);
    console.log('Request Body', req.body);

    setTimeout(() => {
        const now = new Date().getMilliseconds();
        const error = now % 3 === 0;

        res.send({
            resultCode: error ? 0 : 1,
            resultData: getRandomImage(),
            errorDisplay: error,
            errorMessage: error ? 'Hello, this is just a testing error. There are 33.3% requests will return this error.' : ''
        });
    }, Math.random() * 1000);
});

module.exports = router;