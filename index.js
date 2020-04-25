require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

app.locals.env = process.env;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('post/publish'));

app.put('/_api/media/upload', (req, res) => setTimeout(
    () => {
        const now = new Date().getMilliseconds();
        const error = now % 3 === 0;
        res.send({
            resultCode: error ? 0 : 1,
            resultData: {
                type: 'PHOTO',
                thumb: '/img/ship-white.jpg',
                original: '/img/ship-white.jpg',
                width: 1200,
                height: 800
            },
            errorDisplay: false,
            errorMessage: error ? 'This is an random error that cannot be fixed' : ''
        })
    }
    , 5000
));

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));
