const express=require('express');
const router=express.Router();

const{ registerUser, 
	loginUser, 
	forgotPassword ,
	resetPassword,
	 getUserProfile,
	 updatePassword,
	 updateProfile,
	 allUser,
	 getUserDetails,
	 logout,
	 updateUser,
	 DeleteUserDetails
	 } = require('../controllers/authController.js');
const {isAuthenticatedUser,authorizeRoles} =require('../middlewares/auth.js')

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/profile').get(isAuthenticatedUser,getUserProfile); //only authenticated user profile will be visible

router.route('/password/update').put(isAuthenticatedUser,updatePassword); 

router.route('/profile/update').put(isAuthenticatedUser,updateProfile);

//admin routes

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),allUser);

router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails) //used to get specific user with i

router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUser); // used to update specific user profile with id

router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),DeleteUserDetails);


router.route('/logout').get(logout);


module.exports=router

