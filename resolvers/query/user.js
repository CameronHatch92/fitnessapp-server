const axios = require('axios');
const knex = require('../../knex');

module.exports = async (root, args) => {

  const user = await knex.select('username', 'id', 'email')
    .from('users')
    .where({id: args.id})
    .first();

  const goals = await knex.select('title', 'category', 'start_date', 'end_date',
    'goal', 'complete', 'id', 'unit', 'type')
    .from('goals')
    .where({'user_id': args.id});
  console.log(user);  
  user.goals = goals;
  console.log(user);  
  return user;  
}
