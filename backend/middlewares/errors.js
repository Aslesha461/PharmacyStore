const ErrorHandler=require('../utils/errorHandler');

module.exports=(err,req,res,next)=>{

	err.statusCode=err.statusCode || 500;
	/*res.status(err.statusCode).json({
		success:false,
		error:process.env.NODE_ENV,
	})*/
 if(process.env.NODE_ENV.trim() ==='DEVELOPMENT'){
	  res.status(err.statusCode).json({
			success:false,
			error:err,
			errMessage:err.message,
			stack:err.stack
		})
 
	}
  if(process.env.NODE_ENV.trim()==='PRODUCTION'){
	   let error={...err}

		 error.message=err.message

        //wrong mongoose OBIJECT ID Error
				if(err.name === 'CastError'){
					const message=`Resource not Found. Invalid : ${err.path}`;
					error=new ErrorHandler(message,400);
				}
          
        //Handling mongoose validation error 
				if(err.name === 'ValidationError'){
					const message=Object.values(err.errors).map(value => value.message);
					error=new ErrorHandler(message,400);
				} 

				//handling mongoose duplicate user error
        if(err.code === 11000){
					const message=`Duplicate ${Object.keys(err.keyValue)} entered`
					error=new ErrorHandler(message,400);
				}
         
				//Handling wrong jwt errors
				if(err.name === 'JsonWebToken'){
					const message=`JSON web token is invalid , try again!!`;
					error=new ErrorHandler(message,400);
				} 

				//Handling jwt token expired error
				if(err.name === 'TokenExpiredError'){
					const message=`JSON web token expired , try again!!`;
					error=new ErrorHandler(message,400);
				} 


		 res.status(error.statusCode).json({
			success:false,
			message:error.message || 'Internal server error'
		})

	}

	
}