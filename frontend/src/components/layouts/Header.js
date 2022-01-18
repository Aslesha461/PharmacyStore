import React, { Fragment } from 'react'
import '../../App.css';
import {Route,Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import Search from './Search'
import {logoutUser} from '../../actions/userActions'


const Header = () => {

  const alert =useAlert();
	const dispatch=useDispatch();

  const {user,loading} = useSelector(state=>state.auth);
  const {cartItems}=useSelector(state=>state.cart);

  const logoutHandler=()=>{
    dispatch(logoutUser());
    alert.success('Logged out Successfully');
  }

	return (
		<Fragment>
			<nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to='/'>
          <h2>PharmacyStore</h2>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        
         <Route render={({history})=> <Search history={history}/>} />
       
      </div>
      

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{textDecoration: 'none'}} >
        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>

      {user ? (
         <div className="ml-4 dropdown d-inline ">
           <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <span>{user && user.name }</span>
           </Link>
           <div className="dropdown-menu "aria-labelledby="dropDownMenuButton"> 
           {user && user.role !== 'admin' ? (
           <Link className="dropdown-item" to="/orders/me">Orders
           </Link>
           ):(
           <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
           )}
           
           <Link className="dropdown-item" to="/profile">
             Profile
             </Link>
           <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
             Logout
             </Link>
           </div>
            </div>

      ): !loading &&   
      <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
    }


        
      </div>
    </nav>
		</Fragment>
	)
}

export default Header
