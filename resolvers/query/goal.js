const knex = require('../../knex');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const userId = decodedToken.user.id;
  const goal = await knex.select('title', 'category', 'start_date', 'end_date',
    'goal', 'complete', 'id', 'unit', 'type', 'user_id')
    .from('goals')
    .where({id: args.id})
    .first();
  if(!goal){
    throw('Goal not found');
  }
  if(goal.user_id !== userId){
    throw('Unauthorized!');
  }
  return goal;  
  
}