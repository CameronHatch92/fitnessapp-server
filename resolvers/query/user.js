const axios = require('axios');
const knex = require('../../knex');

module.exports = async (root, args) => {
  return await knex.select(*)
  .from('users')
  .then(results => {
    console.log(`Here are the results: ${JSON.stringify(results)}`);
    return JSON.stringify(results);
  })
  .catch(err => err);
}