const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// assign from .env
app.locals.env = process.env;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// public assets
app.use(express.static(path.join(__dirname, '../../../public')));

// homepage
app.get('/', (req, res) => res.render('post/publish'));

// endpoints
app.use('/_api/post', require('./test/endpoints/post'));
app.use('/_api/media', require('./test/endpoints/media'));

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));
