import axios from 'axios';
import { ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
	CLEAR_ERRORS,
	NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
	NEW_PRODUCT_RESET,
	NEW_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST ,
  DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_RESET,
	DELETE_PRODUCT_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
 } from '../constants/productConstants'

 export const getAllProduct=(keyword='',currentPage,category) => async(dispatch)=>{
    
	  try {
			dispatch({type:ALL_PRODUCTS_REQUEST})
      
			let link = `/api/v1/prod?page=${currentPage}&keyword=${keyword}`;
			if(category){
				 link = `/api/v1/prod?page=${currentPage}&keyword=${keyword}&category=${category}`;
			}
			//passing request to server to get products in data 
			const {data}=await axios.get(link)
      //console.warn(data)
			dispatch({
				type:ALL_PRODUCTS_SUCCESS,
			  payload:data
			})
			
		} catch (error) {
			dispatch({ 
				type:ALL_PRODUCTS_FAIL,
				payload:error.response.data.message
			})
		}

 }

//get product Details
export const getProductDetails=(id) =>async (dispatch)=>{
    
	try {
		dispatch({type:PRODUCT_DETAILS_REQUEST})

		//passing request to server to get products in data 
		const {data}=await axios.get(`/api/v1/product/${id}`)

		dispatch({
			type:PRODUCT_DETAILS_SUCCESS,
			payload:data.product 
		})
		
	} catch (error) {
		dispatch({ 
			type:PRODUCT_DETAILS_FAIL,
			payload:error.response.data.message
		})
	}

}

export const newProduct = (productData) => async (dispatch) => {
	try {

			dispatch({ type: NEW_PRODUCT_REQUEST })

			const config = {
					headers: {
							'Content-Type': 'application/json'
					}
			}

			const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)

			dispatch({
					type: NEW_PRODUCT_SUCCESS,
					payload: data
			})

	} catch (error) {
			dispatch({
					type: NEW_PRODUCT_FAIL,
					payload: error.response.data.message
			})
	}
}

export const deleteProduct = (id) => async (dispatch) => {
	try {

			dispatch({ type: DELETE_PRODUCT_REQUEST })

			
			const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

			dispatch({
					type: DELETE_PRODUCT_SUCCESS,
					payload: data.success,
			})

	} catch (error) {
			dispatch({
					type: DELETE_PRODUCT_FAIL,
					payload: error.response.data.message
			})
	}
}

//get admin product
export const getAdminProducts=() =>async (dispatch)=>{
    
	try {
		dispatch({type:ADMIN_PRODUCTS_REQUEST})

		//passing request to server to get products in data 
		const {data}=await axios.get(`/api/v1/admin/products`)

		dispatch({
			type:ADMIN_PRODUCTS_SUCCESS,
			payload:data.products
		})
		
	} catch (error) {
		dispatch({ 
			type:ADMIN_PRODUCTS_FAIL,
			payload:error.response.data.message
		})
	}

}


 //clear errors and

 export const clearErrors =()=> async (dispatch) => {
	 dispatch({ 
		 type:CLEAR_ERRORS,
	 })
 }