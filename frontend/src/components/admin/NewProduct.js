import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layouts/Metadata";
import Sidebar from "./Sidebar";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {
  
	const [product,setProduct]=useState({
		name:'',
		price:'',
		description:'',
		category:'',
		stock:'',
		seller:'',

	});
	const {name,price,description,category,stock,seller} = product;

  const categories = [
    'Skin',
								'Home',
								'Pain',
								'Baby',
								'Personal',
								'COVID',
								'Ayurvedic',
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  //console.log(orders)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      history.push("/admin/products");
      alert.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { name, price, description, category, stock, seller };
    dispatch(newProduct(data));
  };

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log(product);
  };

  return (
    <Fragment>
      <Metadata title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                <h1 className="mb-4">New Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
										name='name'
                    value={name}
										onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
										name='price'
                    value={price}
										onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
										name='description'
										value={description}
										onChange={onChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select className="form-control" id="category_field" 
									name='category' value={category} onChange={onChange}
									
									>
                    {categories.map(category=>(
											<option  key={category}  name='category' value={category}>{category}</option>
										))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
										name='stock'
                    value={stock}
										onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
										name='seller'
                    value={seller}
										onChange={onChange}
                  />
                </div>

               
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
									disabled={loading ? true :false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
