const knex = require('../../knex');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const userId = decodedToken.user.id;

  const user = await knex.select('username', 'id')
    .from('users')
    .where({ 'id': userId })
    .first();
  if (!user) {
    throw ('Unauthorized!');
  }

  const goalId = args.id;
  if (!goalId) {
    throw ('Need goalId to delete')
  }

  const goalCheck = await knex.select('user_id')
    .from('goals')
    .where({ 'id': goalId })
    .first();

  if (goalCheck.user_id !== userId) {
    throw ('Unauthorized');
  }

  const deletedNum = await knex('goals')
    .del()
    .where({'id': goalId});

  if(deletedNum>0){
    return 'Goal was deleted.'
  }
  return 'Invalid goalId'

}