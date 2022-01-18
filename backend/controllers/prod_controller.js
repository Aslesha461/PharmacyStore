const Product=require('../models/product');

const ErrorHandler=require('../utils/ErrorHandler.js');

const catchAsyncErrors=require('../middlewares/catchAsyncErrors.js')

const APIFeatures=require('../utils/apiFeatures.js');

//create new product = /api/v1/admin/product/new

exports.newProduct=catchAsyncErrors (async(req,res,next)=>{
	req.body.user=req.user.id;
	
	const product = await Product.create(req.body);
	
	res.status(201).json({
		success:true,
		product
	})

})

//get all products => /api/v1/prod
exports.getProducts=catchAsyncErrors (async (req,res,next)=>{
  
	 const resPerPage=8;
   const prodCount= await Product.countDocuments();

	const apiFeatures=new APIFeatures(Product.find(), req.query)
	                  .search()
										.filter()
	          let products=await apiFeatures;
						let filteredProductsCount=products.length;
	 apiFeatures.pagination(resPerPage);					
	 products=await apiFeatures.query; //will give all the products from the find method
 
	setTimeout(() => {
		res.status(200).json({
			success:true,
			prodCount,
			resPerPage,
			filteredProductsCount,
			products
		
		})
	}, 2000);
	 

})

// get single product => api/v1/product/:id

exports.getSingleProducts= catchAsyncErrors (async(req,res,next)=>{
	 const product=await Product.findById(req.params.id); //getting the product by taking id as request param

	 if(!product){ //if no id found return the req status with error message
		
		 return next(new ErrorHandler('Product not Found',404));
		/* res.status(404).json({
			 success:false,
			 message:'Product not found'
		 })*/
		}

		res.status(200).json({
			success:true,
			product
		})
})

//update product ==> /api/v1/admin/product/:id 

exports.updateProduct= catchAsyncErrors (async(req,res,next)=>{
	let product=await Product.findById(req.params.id);
	if(!product){
		return next(new ErrorHandler('Product not Found',404));
		
		/*res.status(404).json({
			success:true,
			message:'Product not found'
		})*/
	}
	 product=await Product.findByIdAndUpdate(req.params.id,req.body,{
	  new:true,
		runValidators:true,
		useFindAndModify:false	
	});

	res.status(200).json({
		success:true,
		product
	})
})

//delete product ==> /api/v1/admin/product/:id

exports.deleteProductById= catchAsyncErrors (async(req,res,next )=>{
	let product=await Product.findById(req.params.id);
	if(!product){

		return next(new ErrorHandler('Product not Found',404));
		/*res.status(404).json({
			success:true,
			message:'Product not found'
		})*/ 
	}

	await product.remove();
	res.status(200).json({
		success:true,
		message:'Product deleted'
	})
	
})


//create new  review   ==>/api/v1/review

exports.createProductReview= catchAsyncErrors (async(req,res,next)=>{
    const { rating, comment,productId}=req.body
		const review ={
			user:req.user._id,
			name:req.user.name,
			rating:Number(rating),
			comment
		}


		const product = await Product.findById(productId)

		console.log(product.reviews);
		const isReviewed=product.reviews.find(
			r => r.user.toString() === req.user._id.toString()
		)

    if(isReviewed){ //if review is reviewed then update it here
        product.reviews.forEach(review => {
					if(review.user.toString()=== req.user._id.toString()){
						review.comment=comment;
						review.rating=rating;
					}
				})

		}else{ //else add the new review
			product.reviews.push(review);
			product.numOfReviews=product.reviews.length;
		}

		product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	res.status(200).json({
			success: true,
			reviews: product.reviews
	})
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

	const product = await Product.findById(req.query.productId);//passing the id of product and id of reviews

	// console.log(product);
  

	const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

	const numOfReviews = reviews.length;

	const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

	//deleting the reviews by nulling rating and numofreviews

	//passing the id of product and id of reviews
	await Product.findByIdAndUpdate(req.query.productId, {
			reviews,
			ratings,
			numOfReviews
	}, {
			new: true,
			runValidators: true,
			useFindAndModify: false
	})

	res.status(200).json({
			success: true
	})
})

//get all products for admin => /api/v1/admin/products
exports.getAdminProducts=catchAsyncErrors (async (req,res,next)=>{
  
const 	products=await Product.find(); //will give all the products from the find method

 setTimeout(() => {
	 res.status(200).json({
		 success:true,
		 products
	 
	 })
 }, 2000);
	

})