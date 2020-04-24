const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.locals.env = {
    MODE: 'development'
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('post/publish'));

app.put('/_api/media/upload', (req, res) => setTimeout(() => res.send({
    resultCode: 1,
    resultData: {
        type: 'PHOTO',
        thumb: '/img/car1.jpg',
        original: '/img/car1.jpg',
        width: 1200,
        height: 800
    },
    errorDisplay: false,
    errorMessage: ''
}), 5000));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
