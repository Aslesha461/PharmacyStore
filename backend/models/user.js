const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const crypto = require('crypto');

const userSchema=new mongoose.Schema({
  name: {
		type: String,
		required: [true,'Please Enter Name'],
		maxLength: [30,'Name should not exceed 30 characters'],

	},
	email:{
       type:String,
				required:[true,'Please Enter Email'],
				unique:true,
				validate:[validator.isEmail,'Please enter a valid email'],

	},
	password:{
		type:String,
		required: [true,'Please Enter Password'],
		minlength: [6,'Password must be at least 6 characters long'],
		select:false
	},
	role:{
			type:String,
			default:'user'
		},
		createdAt:{
			type:Date,
			default:new Date(),
		},
		resetPasswordToken:String,
		resetPasswordExpires:Date,
})


//encrypting password before saving

userSchema.pre('save',async function(next){
	if(!this.isModified('password')){
		next()
	}
	this.password=await bcrypt.hash(this.password,10)
})




//generating JWT token 
userSchema.methods.getJwtToken = function(){
	return jwt.sign({id:this._id},process.env.JWT_SECRET,{
		expiresIn:process.env.JWT_EXPIRES_TIME
	});
}

//comparing the password
userSchema.methods.comparePassword= async function(enterPassword){
	return await bcrypt.compare(enterPassword,this.password);
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash and set to resetPasswordToken
	this.resetPasswordToken = resetToken

	// Set token expire time
	this.resetPasswordExpires = Date.now() + 3600000

	return resetToken

}


module.exports = mongoose.model('user',userSchema);