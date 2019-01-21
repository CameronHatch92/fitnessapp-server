'use strict';

const express = require('express');
const { GraphQLServer, PubSub } = require('graphql-yoga');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('./knex');
const jwt = require('jsonwebtoken');

const typeDefs = './schema.graphql';
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const { PORT, JWT_SECRET } = require('./config');

const resolvers = {
  Query,
  Mutation
};

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: incomingData => ({
    incomingData,
    pubsub,
    isAuthorized: () => {
      const AuthHeader = incomingData.request.header('authorization');
      if(!AuthHeader){
        throw('Unauthorized!');
      }
      const token = AuthHeader.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, JWT_SECRET);
      return decodedToken;
    }
  })
});

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

if (require.main === module) {
  server.start(() => console.log('Server is running'));
}

module.exports = app; // Export for testing