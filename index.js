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
        res.send('123')
    }
    , 5000
));

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));
