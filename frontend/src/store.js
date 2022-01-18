import{ createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import{composeWithDevTools} from 'redux-devtools-extension';
import {productReducers,productDetailsReducer,newProductReducer,productReducer} from './reducers/productReducers'
import {authReducer,userReducer,forgotPasswordReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'
import { newOrderReducer,myOrdersReducer,orderDetailsReducers,allOrdersReducers } from './reducers/orderReducers';


const reducer=combineReducers({
     products:productReducers,
     productDetails:productDetailsReducer,
     product:productReducer,
     auth : authReducer,
     user: userReducer,
     forgotPassword:forgotPasswordReducer,
     cart:cartReducer,
     newOrder:newOrderReducer,
     myOrders:myOrdersReducer,
     allOrders:allOrdersReducers,
     orderDetails:orderDetailsReducers,
     newProduct:newProductReducer
 })

let initialState={
    cart:{
        cartItems:localStorage.getItem('cartItems')
         ?JSON.parse(localStorage.getItem('cartItems'))
         :[],
         shippingInfo:localStorage.getItem('shippingInfo')
         ? JSON.parse(localStorage.getItem('shippingInfo'))
         :[]
    }
 }

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;