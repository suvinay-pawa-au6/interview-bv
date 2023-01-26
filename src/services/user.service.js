const { User } = require('../models');
const bcrypt = require('bcryptjs');

/**
 * Service to Register a new user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {

  try{
    const user = await User.findOne({  email : userBody.email}).lean()
    if(user){
      throw new Error("User with this email already exists")
    }
    userBody.password = await bcrypt.hash(userBody.password, 8);
    return User.create(userBody);
  }
  catch(error){
    throw error
  }
  
};

const loginUser = async (loginBody) => {
  try{
    const user = await User.findOne({ email : loginBody.email }).lean()
    if(!user){
      throw new Error("User with this email doesnt exist")
    }

    const isPasswordMatching =  await bcrypt.compare(loginBody.password,user.password)

    if(isPasswordMatching){
      return user
    }
    else{
      throw new Error("User Id & Password does not match") 
    }
  }
  catch(error){
    throw error

  }
}

module.exports = {
  createUser,
  loginUser
};
