import React from 'react'

import { Fragment,useState,useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Metadata from './layouts/Metadata'
import {useDispatch,useSelector} from'react-redux'
import { getAllProduct } from '../actions/productActions'
import Product from './product/Product' 
import Loader from './layouts/Loader'
import {useAlert } from 'react-alert'




const Home = ({match}) => {
	
	 const [currentPage,setCurrentPage] =useState(1)
	 const [category,setCategory] =useState('')
	 const categories=[
		'Skin',
		'Home',
		'Pain',
		'Baby',
		'Personal',
		'COVID',
		'Ayurvedic',
	 ]
    const alert=useAlert(); 	
    const dispatch=useDispatch();
		
		const {loading , products, error,prodCount,resPerPage,filteredProductsCount}= useSelector(state => state.products)

		const keyword=match.params.keyword
	//will  be run first when home component is loaded
  useEffect(() => {
		if(error){
			return alert.error(error);
		}
		
		dispatch(getAllProduct(keyword,currentPage,category));

		
	}, [dispatch,alert ,error,keyword,currentPage,category])

function setCurrentPageNo(pageNumber){
	setCurrentPage(pageNumber)
}

let count = prodCount
if(keyword){
	count=filteredProductsCount
}
	return (
		<Fragment>
			{loading?<Loader/>   : 
			<Fragment>
			  <Metadata title={'Online Medical Store '}/>
				<h1 id="products_heading">Latest Products</h1>
	
					 <section id="products" className="container mt-5">
					 <div className="row">
             <div className="col-0 col-md-3 mt-5 mb-5">
							 <div className="px-5">
							 <div className="mt-5">
								 <hr className="my-5"/>
									 <h4 className="mb-3">
										 Categories
									 </h4>
									 <ul className="pl=0">
										 {categories.map(category=>(
											 <li
												 style={{cursor: 'pointer',
												          listStyleType:'none'}}
													key={category}
													onClick={()=>setCategory(category)}>
                           {category}
											 </li>
										 ))}
									 </ul>
								 </div>
							 </div>
						 </div>
						  
								 
							 

						 <div className="col-6 col-md-9">
						 <div className="row">
						 {
						     products && products.map(product=>(
								 <Product key={product._id} product={product} col={4} />
					        ))					 
							
								 }
								 </div>
						 </div>
			</div>
	</section>


	{resPerPage<=count && (
  <div className="d-flex justify-content-center mt-5 ">
	<Pagination 
		 activePage={currentPage}
			itemsCountPerPage={resPerPage}	
			totalItemsCount={prodCount}
			onChange={setCurrentPageNo}
			nextPageText={'Next'}
			prevPageText={'Prev'}
			firstPageText={'First'}
			lastPageText={'Last'}
			itemClass="page-item"
			linkClass="page-link"

	/>
</div>
	)}
  

	</Fragment>
			}
			
</Fragment>
	)
}

export default Home
