const axios = require('axios');
const knex = require('../../knex');

module.exports = async (root, args) => {
  const user = await knex.select('username', 'id', 'email')
    .from('users')
    .where({id: args.id})
    .first();
  return user;  
}
