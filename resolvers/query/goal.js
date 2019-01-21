const knex = require('../../knex');

module.exports = async (root, args) => {
  const goal = await knex.select('title', 'category', 'start_date', 'end_date',
    'goal', 'complete', 'id', 'unit', 'type')
    .from('goals')
    .where({id: args.id})
    .first();

  return goal;  
  
}