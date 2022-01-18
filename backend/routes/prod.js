const express = require('express')
const router=express.Router();

const {getProducts,newProduct,
  getSingleProducts,
  updateProduct,
  deleteProductById,
  createProductReview,
  getProductReviews,
  getAdminProducts,
  deleteReview
}=require('../controllers/prod_controller');

const{ isAuthenticatedUser, authorizeRoles }=require('../middlewares/auth.js');

router.route('/prod').get(getProducts); //route to display all the products
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProducts); //route for single product 

router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
           .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProductById); //route for updating product

router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct); //route for new product begin added

router.route('/review').put(isAuthenticatedUser,createProductReview);

router.route('/reviews').get(isAuthenticatedUser,getProductReviews);

router.route('/reviews').delete(isAuthenticatedUser,deleteReview);

module.exports=router;