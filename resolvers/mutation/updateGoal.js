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

  const updateObj = {};
  const updateableFields = ['title', 'end_date', 'start_date', 'complete', 'goal', 'unit', 'type'];

  const goalId = args.id;
  if (!goalId) {
    throw ('Need goalId to update')
  }

  const goalCheck = await knex.select('user_id')
    .from('goals')
    .where({ 'id': goalId })
    .first();

  if (!goalCheck) {
    throw ('Goal not found.')
  }
  
  if (goalCheck.user_id !== userId) {
    throw ('Unauthorized');
  }

  updateableFields.forEach(field => {
    if (field in args) {
      updateObj[field] = args[field];
    }
  });
  const updatedGoal = await knex('goals')
    .update(updateObj)
    .where({ 'id': goalId, 'user_id': userId })
    .returning('*');

  if (!updatedGoal[0]) {
    throw ('Unable to update.')
  }
  return updatedGoal[0];
}