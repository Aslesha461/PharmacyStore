import { ALL_PRODUCTS_REQUEST,
      	 ALL_PRODUCTS_SUCCESS,
	       ALL_PRODUCTS_FAIL,
				 ADMIN_PRODUCTS_REQUEST,
				 ADMIN_PRODUCTS_SUCCESS,
				 ADMIN_PRODUCTS_FAIL,
				 NEW_PRODUCT_REQUEST,
				 NEW_PRODUCT_SUCCESS,
				 NEW_PRODUCT_RESET,
				 NEW_PRODUCT_FAIL,
				 DELETE_PRODUCT_REQUEST ,
				 DELETE_PRODUCT_SUCCESS,
				 DELETE_PRODUCT_RESET,
				 DELETE_PRODUCT_FAIL,
				 CLEAR_ERRORS,
				 PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAIL,
        } from '../constants/productConstants'


//get all the products
export const productReducers=(state ={products:[]} , action) =>{
 
    switch(action.type){
			 case  ALL_PRODUCTS_REQUEST: 
			 case  ADMIN_PRODUCTS_REQUEST:
			   return{
					 loading: true,
					 products:[]
				 }    
				
				case ALL_PRODUCTS_SUCCESS:
					return {
							loading: false,
							products: action.payload.products,
							prodCount:action.payload.prodCount,
							resPerPage:action.payload.resPerPage,
							filteredProductsCount:action.payload.filteredProductsCount
						}

				case  ADMIN_PRODUCTS_SUCCESS:
					return {
                loading:false,
								products:action.payload
					}	

				case ALL_PRODUCTS_FAIL:	
				case  ADMIN_PRODUCTS_FAIL:
				   return {
						 loading: false,
						 error:action.payload
					 }	
				case CLEAR_ERRORS:
          return {
                ...state,
                error: null
            }	 
			 default:
				 return state;
		}

}

export const productReducer = (state = { }, action) => {

	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
			return {
				...state,
				loading:true
			}
     
			case DELETE_PRODUCT_SUCCESS:
				return {
					...state,
					loading:false,
					isDeleted:action.payload
					
				}
      
			case DELETE_PRODUCT_FAIL:
				return {
					...state,
					error:action.payload
				}	
			case DELETE_PRODUCT_RESET:
				return {
					...state,
					isDeleted:false
				}	

				case CLEAR_ERRORS:
          return {
                ...state,
                error: null
            }	

						
		default:
			return state;
	}

}

export const newProductReducer = (state = { product: {} }, action) => {

	switch (action.type) {
		case NEW_PRODUCT_REQUEST:
			return {
				...state,
				loading:true
			}
     
			case NEW_PRODUCT_SUCCESS:
				return {
					loading:false,
					success:action.payload.success,
					product:action.payload.product
				}
      
			case NEW_PRODUCT_FAIL:
				return {
					...state,
					error:action.payload
				}	
			case NEW_PRODUCT_RESET:
				return {
					...state,
					success:false
				}	

				case CLEAR_ERRORS:
          return {
                ...state,
                error: null
            }	

						
		default:
			return state;
	}



}
//to display product Details
export const productDetailsReducer = (state = { product:{} },action)=>{
	switch(action.type){

		case PRODUCT_DETAILS_REQUEST :
			return {
         ...state,
          loading: true

       		}

		case PRODUCT_DETAILS_SUCCESS :
			return {
		       loading: false,
					 product:action.payload

				}
    case  PRODUCT_DETAILS_FAIL:
			return{
				...state,
				error: action.payload
			}

			case CLEAR_ERRORS:
          return {
                ...state,
                error: null
            }	 

		default:
				 return state;
	}
}