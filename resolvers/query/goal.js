const knex = require('../../knex');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const userId = decodedToken.user.id;
  const goal = await knex.select('*')
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