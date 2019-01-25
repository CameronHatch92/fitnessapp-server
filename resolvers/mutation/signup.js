const knex = require('../../knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../../config');

module.exports = async (root, args) => {
  const {password, email, username} = args;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await knex.select('username')
    .from('users')
    .where({'username': username})
    .first();

  if(user){
    throw 'Username is already taken.';
  } 
   
  const id = await knex('users')
    .insert({password: hashedPassword, username, email})
    .returning('id');

  const user = {id: id[0], username};  
  
  return jwt.sign({user}, JWT_SECRET);  
}