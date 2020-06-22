const express = require('express');
const dotenv = require('dotenv');
const dbConnection = require('./config/db');
const morgan = require('morgan');
const expressHandlebars = require('express-handlebars');
const path = require('path');

// Config file

dotenv.config({ path: './config/config.env' });

dbConnection();

const app = express();

// Morgan Logger (disabled on prod)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars init, changing default extension to .hbs

app.engine(
  '.hbs',
  expressHandlebars({ defaultLayout: 'main', extname: '.hbs' })
);
app.set('view engine', '.hbs');

// Static folder

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`)
);
