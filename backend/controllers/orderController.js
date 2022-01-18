const Order= require('../models/order');
const Product=require('../models/product.js');

const ErrorHandler=require('../utils/errorHandler.js');
const catchAsyncErrors=require('../middlewares/catchAsyncErrors.js');


//create and save new order ==> /api/v1/order/new
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{

	 const { shippingInfo,
		       orderItems,
					 itemsPrice,
					 taxPrice,
					 shippingPrice,
					 TotalPrice,
					 paymentInfo } = req.body;

					const order= await Order.create({
						shippingInfo,
		       orderItems,
					 itemsPrice,
					 taxPrice,
					 shippingPrice,
					 TotalPrice,
					 paymentInfo,
					 paidAt:Date.now(),
					 user:req.user._id
					})

					res.status(200).json({
						success: true,
						order
					})
})



// get single order ==> /api/v1/order/:id
exports.getSingleOrder=catchAsyncErrors(async(req, res, next)=>{
   
	   const order = await Order.findById(req.params.id)
		 
		 if(!order){
			 return next(new ErrorHandler('No order found with the given ID',400));
		 }

		 res.status(200).json({
			 success:true,
			  order
			})
	 
})

// get logged in users order ==> /api/v1/orders/me 
exports.meOrders=catchAsyncErrors(async(req, res, next)=>{
   
	const order= await Order.find({
		user:req.user.id
	})
	
	res.status(200).json({
		success:true,
		 order
	 })

})


// Admin get all users order ==> /api/v1/admin/orders
exports.allOrders=catchAsyncErrors(async(req, res, next)=>{
   
	const order= await Order.find()
	let totalAmount=0;
 order.forEach(orders=>{
	 totalAmount+=orders.TotalPrice
 })
	res.status(200).json({
		success:true,
		totalAmount,
		 order
	 })

})

// Admin update process  order ==> /api/v1/admin/order/:id use order id
exports.updateOrder=catchAsyncErrors(async(req, res, next)=>{
   
	const order= await Order.findById(req.params.id)
	  if(order.orderStatus==='Delivered'){
			return next(new ErrorHandler('Order already delivered',400))
		}

		order.orderItems.forEach(async item=>{
			await updateStocks(item.product,item.quantity)
		})

		order.orderStatus=req.body.status,
		order.deliveredAt=Date.now()
		await order.save()

	res.status(200).json({
		success:true,
	
	 })

})

async function updateStocks(id , quantity){
	const product =await Product.findById(id);

	 product.stock=product.stock-quantity; //updating the stock 

	 await product.save({validateBeforeSave: false});
}


// get Delete  order ==> /api/v1/admin/orders/:id
exports.deleteOrder=catchAsyncErrors(async(req, res, next)=>{
   
	const order = await Order.findById(req.params.id)
	
	if(!order){
		return next(new ErrorHandler('No order found with the given ID',400));
	}

	await order.delete();

	res.status(200).json({
		success:true,
	 })

})