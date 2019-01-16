'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('./knex');

const {PORT} = require('./config');

// Create Express app
const app = express();

// Log all requests
app.use(morgan('dev'));

// Enable CORS support
app.use(cors());

// Parse request body
app.use(express.json());

//Test endpoint
app.get('/', (req, res, next) => {
  knex.select('name', 'email')
    .from('users')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// Listen for incoming connections

if(require.main === module){
  app.listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app; // Export for testing