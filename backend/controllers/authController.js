const User=require('../models/user.js');
const ErrorHandler=require('../utils/errorHandler.js');

const catchAsyncErrors=require('../middlewares/catchAsyncErrors.js');
const sendToken = require('../utils/jwtToken.js');
const sendEmail=require('../utils/sendEmail.js');
const crypto=require('crypto');
// register ==> /api/v1/register

exports.registerUser = catchAsyncErrors ( async (req,res,next) => {
 
	 const {name,email,password} = req.body; //pull the userdetails
   //console.log(req.body);
	 const user=await User.create({
		  name,
		  email,
	    password,
		})

		 sendToken(user,200,res)

})


//logn user => /api/v1/login

exports.loginUser=catchAsyncErrors(async (req,res,next)=>{
  const {email,password} = req.body;

	//checks if email and password entered by user are
	if(!email || !password){
		return next(new ErrorHandler('Please enter email and password',400));

	}
	 
	//finding user in database already registered
const user = await  User.findOne({email}).select('+password')

if(!user){
  return next(new ErrorHandler('Invalid username or password',401));
}

   const isPasswordMatched=await user.comparePassword(password);

	 if(!isPasswordMatched){
		return next(new ErrorHandler('Invalid username or password',401));
	 }

	 sendToken(user,200,res)

})

//forgot password =>  /api/v1/password/forgot 
exports.forgotPassword = catchAsyncErrors ( async (req,res,next) => {
	const user = await User.findOne({email:req.body.email});
	
	if(!user){
		return next(new ErrorHandler('No user with this email Found',404));
	}
// get the reset token
 const resetToken=await user.getResetPasswordToken();

 await user.save({validateBeforeSave:false});
 const resetUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

 const message = `Your password reset token is :\n\n ${resetUrl} \n\n If you are not the intended recieptent this email,kindly ignore it`;
					try{
             await sendEmail({
							 email:user.email,
							 subject:'PharmacyStore password Recovery',
							 message
						 })   
						 
						 res.status(200).json({
							 success:true,
							message:`email sent to ${user.email}`
							})

					}	catch(error){
						user.resetPasswordToken=undefined;
						user.resetPasswordExpires=undefined;

            await user.save({validateBeforeSave:false});  

						return next(new Error(error.message,500));
					}				 

})


// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
   const user = await User.findOne({
			resetPasswordToken:req.params.token,
			resetPasswordExpires: { $gt: Date.now() }
	})
  //console.log(user);
	if (!user) {
			return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
	}

	if (req.body.password !== req.body.confirmPassword) {
			return next(new ErrorHandler('Password does not match', 400))
	}

	// Setup new password
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;

	await user.save();

	sendToken(user, 200, res)

})






//get current logged user details ==> /api/v1/profile

exports.getUserProfile=catchAsyncErrors( async (req,res,next)=>{
	const user = await User.findById(req.user.id); //getting the user info from the generated user id 

	res.status(200).json({
		success: true,
		user
	})
})

// Update current user password ==> /api/v1/password/Update
exports.updatePassword=catchAsyncErrors( async (req,res,next)=>{

   const user= await User.findById(req.user.id).select('+password');

	  //check previous password
		const isMatched= await user.comparePassword(req.body.oldPassword)  //compares the old and new Password
		if(!isMatched){
			return next(new ErrorHandler('Old password mismatch',400));
		}

		user.password=req.body.password;
		await user.save();

		sendToken(user,200,res)

	})

	//update user profile info ==> /api/v1/profile/update

	exports.updateProfile= catchAsyncErrors( async(req,res,next)=>{

     const newUserData={
			 name:req.body.name,
			 email:req.body.email
		 }

		 const user=await User.findByIdAndUpdate(req.user.id, newUserData,{
			 new:true,
			 runValidators:true,
			 userFindAndModify:false
		 })

		    res.status(200).json({
					success:true,
					user
				})
				

	})





//logout => /api/v1/logout
exports.logout= catchAsyncErrors ( async (req,res,next) => {
	res.cookie('token',null,{
		expires:new Date(Date.now()),
		httpOnly:true
	})
 
	  res.status(200).json({
			success:true,
		  message:"Logged out"
		})

})

//Here are all the admin routes 

//get all users ==> /api/v1/admin/users

exports.allUser= catchAsyncErrors( async (req,res,next) => {
   const user= await User.find();

	 res.status(200).json({
		 success:true,
		 user
	 })

})

//get specific user details ==>/api/v1/admin/user/:intended

exports.getUserDetails=catchAsyncErrors( async (req,res,next)=>{
    
	   const user = await User.findById(req.params.id);
		 
		 if(!user){
          return next(new ErrorHandler(`User not found for ID: ${req.params.id}`,))
	
			}

			res.status(200).json({
				success: true,
				user
			})

})

//Admin - update user profile info ==> /api/v1/admin/user/:id

exports.updateUser= catchAsyncErrors( async(req,res,next)=>{

	const newUserData={
		name:req.body.name,
		email:req.body.email,
		role:req.body.role
	}

	const user=await User.findByIdAndUpdate(req.params.id, newUserData,{
		new:true,
		runValidators:true,
		userFindAndModify:false
	})

		 res.status(200).json({
			 success:true,
		 })
		 

})

//ADMIN Delete user details ==>/api/v1/admin/user/:id

exports.DeleteUserDetails=catchAsyncErrors( async (req,res,next)=>{
    
	const user = await User.findById(req.params.id);
	
	if(!user){
			 return next(new ErrorHandler(`User not found for ID: ${req.params.id}`,))

	 }
     await user.remove();

	 res.status(200).json({
		 success: true,
		 message:`Profile Deleted ${req.params.id}`
	 })

})