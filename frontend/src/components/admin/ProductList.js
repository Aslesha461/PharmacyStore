import React ,{Fragment,useEffect}from 'react'
import {Link} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'
import Loader from '../layouts/Loader'
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layouts/Metadata";
import Sidebar from './Sidebar'
import {getAdminProducts,deleteProduct,clearErrors} from '../../actions/productActions'
import {DELETE_PRODUCT_RESET} from '../../constants/productConstants'

const ProductList = ({history}) => {
	const alert = useAlert();
  const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);
		const {error:deleteError, isDeleted}=useSelector(state=>state.product);
    //console.log(orders)
		
		useEffect(() => {
			
			dispatch(getAdminProducts());
			//console.log(orders);

			if (error) {
					alert.error(error);
					dispatch(clearErrors())
			}

			if (deleteError) {
				alert.error(deleteError);
				dispatch(clearErrors())
		}
		if(isDeleted){
			alert.success('Product deleted');
			history.push('/admin/products');
			dispatch({type: DELETE_PRODUCT_RESET})
		}

	}, [dispatch, alert, error,deleteError,isDeleted,history]);

	const setProducts = () => {
		const data = {
			columns: [
					{
							label: 'ID',
							field: 'id',
							sort: 'asc'
					},
					{
							label: 'Name',
							field: 'name',
							sort: 'asc'
					},
					{
							label: 'Price',
							field: 'price',
							sort: 'asc'
					},
					{
							label: 'Stock',
							field: 'stock',
							sort: 'asc'
					},
					{
							label: 'Actions',
							field: 'actions',
					
					},
			],
			rows: []
	}
	products.forEach(product => {
		data.rows.push({
				id: product._id,
				name: product.name,
				price: `$${product.price}`,
				stock: product.stock,
				actions:<Fragment>
						
						<button className="btn btn-danger py-1 px-2 " 
						onClick={()=>deleteProductHandler(product._id)}>
						<i className="fa fa-trash"></i>
						</button>
						
						</Fragment>
		})
})
return data;

}

const deleteProductHandler =(id)=>{
	dispatch(deleteProduct(id))
}

	return (
		<Fragment>
			<Metadata title={'All Products'} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar/>
				</div>
				<div className="col-12 col-md-10">
					<Fragment>
						<h1 className="my-5">All Products</h1>
						{loading ? <Loader/> : (
								<MDBDataTable
								data={setProducts()}
								className="px-3"
								bordered
								striped
								hover
						/>
						)}
					</Fragment>
				</div>
			</div>
			
		</Fragment>
	)
}

export default ProductList
