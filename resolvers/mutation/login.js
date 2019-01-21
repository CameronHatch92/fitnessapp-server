const knex = require('../../knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../../config');

module.exports = async (root, args) => {
  const user = await knex.select('username', 'id', 'password')
    .from('users')
    .where({'username': args.username})
    .first();  
  if(!user){
    throw('Invalid credentials');
  }
  const isAllowed = await bcrypt.compare(args.password, user.password);
  if(!isAllowed){
    throw('Invalid credentials');
  } 
  return jwt.sign({user: {id: user.id, username: user.username}}, JWT_SECRET); 
}