const httpStatus = require('http-status');
const { userService } = require('../services');

/**
 * Controller for Registering a new User
 */
const registerUser = async (req, res) => {
  try
  {
    await userService.createUser(req.body);
    return res.status(httpStatus.CREATED).json({ success : true , message : "User Created Succesfully" });  
  }
  catch(Error)
  {
    return res.json({success : false , message : Error.message})
  }
};

/**
 * Controller to Login a user
 */
const loginUser = async (req, res) => {
  try{
    const user = await userService.loginUser(req.body);
    delete user.password;
    return res.status(httpStatus.OK).json({ success : true, message : "User Logged in Successfully", user });  
  }
  catch(Error){
    return res.json({success : false , message : Error.message})
  }
};


module.exports = {
  registerUser,
  loginUser,
};
