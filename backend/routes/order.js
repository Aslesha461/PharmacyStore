const express = require('express');
const router=express.Router();

const { newOrder, getSingleOrder, meOrders, allOrders,updateOrder ,deleteOrder}=require('../controllers/orderController.js');
const {isAuthenticatedUser,authorizeRoles} =require('../middlewares/auth.js');

router.route('/order/new').post(isAuthenticatedUser,newOrder);

router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser,meOrders)

router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'),allOrders);

router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder); //use order id

router.route('/admin/orders/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder);

module.exports = router;