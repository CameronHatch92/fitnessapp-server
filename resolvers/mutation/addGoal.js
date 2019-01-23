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
  

  const { category, start_date, end_date, title, complete, goal,
    unit, type } = args;

  const newGoal = {
    category,
    start_date,
    end_date,
    title,
    complete,
    goal,
    unit,
    type,
    user_id: userId
  }
  
  const insertedGoal = await knex('goals')
    .insert(newGoal)
    .returning('*');
    
  return insertedGoal[0];   
}