const knex = require('../../knex');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const userId = decodedToken.user.id;

  const user = await knex.select('username', 'id')
    .from('users')
    .where({'id': userId})
    .first();
  if(!user){
    throw('Unauthorized!');
  } 

  const updateObj = {};
  const updateableFields = ['title', 'end_date', 'start_date', 'complete', 'goal', 'unit', 'type'];

  const goalId = args.id;
  if(!goalId){

  }
  updateableFields.forEach(field => {
    if (field in args){
      updateObj[field] = args[field];
    }
  });

  const updatedGoal = await knex('goals')
    .update(updateObj)
    .where({'id': goalId, 'user_id': userId})
    .returning('*');
    return updatedGoal[0];
}