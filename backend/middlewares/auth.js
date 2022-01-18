
// check if user is authenticated or not

const user=require('../models/user.js');
const jwt= require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next) =>{

	const {token} = req.cookies;
  
	if(!token){
		return next(new ErrorHandler('Login first to visit This Page',401));

	}

	const decode=jwt.verify(token,process.env.JWT_SECRET);
	 req.user=await user.findById(decode.id);
	 
	 next();

})


//Handling users roles

exports.authorizeRoles=(...roles)=>{
	 return (req,res,next)=>{
		 if(!roles.includes(req.user.role)){
			 return next(new ErrorHandler(`Role ${req.user.role} don't have access to visit this route`,403));
		 }
		 next();
	 }


}