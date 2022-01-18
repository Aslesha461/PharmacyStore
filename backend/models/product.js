const mongoose=require('mongoose');


const productsSchema= new mongoose.Schema({
    name:{
			type:String,
			required:[true,'Please enter product name'],
			trim:true,
			maxlength:[100,'Product name cannot exceed 100 characters']
				},
		price:{
				type:Number,
				required:[true,'Please enter product price'],
				trim:true,
				maxlength:[5,'Product name cannot exceed 5 characters'],
				default:0.0
				},
				description:{
					type:String,
					required:[true,'Please enter product Description'],
				
						},
						ratings:{
							type:Number,
							default:0
						},
						images:[
							{
								public_id:{
									type:String,
							
								},
								url:{
									type:String,
								
								}
							}
						],
					category:{
						type:String,
						required:[true,'Please Enter the Category of the Product'],
						enum:{
							values:[
								'Skin',
								'Home',
								'Pain',
								'Baby',
								'Personal',
								'COVID',
								'Ayurvedic',
									],
							message:'Please select correct category'
						}
					},
			seller:{
				type:String,
				required:[true,'Please enter product seller']
			},
			stock:{
				type:Number,
				required:[true,'Please enter product stock'],
				maxlength:[5,'Product cannot exceed 5 digit'],
				default:0
      },
			no_of_review:{
				type:Number,
				default:0
			},
			reviews:[
				{ user:{
					type:mongoose.Schema.ObjectId,
					ref:'user',
					required:true
				},
					
					name:{
						type:String,
						required:true
					},
					rating:{
						type:Number,
						required:true
					},
					comment:{
						type:String,
						required:true
					}
				}
			],
			user:{
				type:mongoose.Schema.ObjectId,
				ref:'user',
				required:true
			},
			createdAt:{
				type:Date,
				default:Date.now()
			}		

})

module.exports=mongoose.model('product',productsSchema);