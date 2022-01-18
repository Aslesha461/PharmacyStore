const app=require('./app');
const connectDatabase=require('./config/database')
const dotenv=require('dotenv');

//handling uncaught exceptions
process.on('uncaughtException', err=>{
   console.log(`ERROR: ${err.messgae}`);
    console.log(`Shutting down  due to uncaught exception`);
    process.exit(1);

})



//setting up config file
dotenv.config({path : 'backend/config/config.env'});
//console.log(a); example for uncaught exception 
//connecting to database
connectDatabase();
const server = app.listen(process.env.PORT,()=>{
  console.log(`server is working on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode` );
})

//handling the unhandled promise rejections like connection string invalid

process.on('unhandledRejection',err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down the server due to unhandled promise rejections`);
    server.close(()=>{
     process.exit(1)
    })
})
