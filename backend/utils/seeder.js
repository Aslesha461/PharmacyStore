//with the help of seeder we are fetching dummy data to our database for using it in our api

const Product=require('../models/product'); //database schema file
const dotenv=require('dotenv');

const connectDatabase=require('../config/database'); 
const products=require('../data/product.json'); //importing data from product.json file
const {connect}=require('mongoose'); 

//setting dotenv file
dotenv.config({path:'backend/config/config.env'});

connectDatabase();

const seedProducts= async ()=>{
	try{
       await Product.deleteMany();
			 console.log('Products deleted');

			 await Product.insertMany(products); //insert the records from the products file
	      console.log('all products  inserted');
				process.exit();
	
			}catch(error){
		console.log(error.stack);
		process.exit();
	}
}

seedProducts();