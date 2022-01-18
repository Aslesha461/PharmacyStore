import React from 'react'
import {useState,useEffect,Fragment} from 'react'
import { useAlert } from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import Metadata from '../layouts/Metadata'
import {register , clearErrors} from '../../actions/userActions'


const Register = ({history}) => {

	
	const [user,setUser]= useState({
		name:'',
		email:'',
		password:''
	})

	const {name,email,password} = user;

	const alert =useAlert();
	const dispatch=useDispatch();

	const {isAuthenticated,error,loading}=useSelector(state=>state.auth);

useEffect(() => {
	
	if(isAuthenticated){
		history.push('/');
	}

	if(error){
		alert.error(error);
		dispatch(clearErrors());
	}
}, [dispatch,alert,isAuthenticated,error,history])

const submitHandler=(e) =>{
	e.preventDefault();

	const data={name,email,password}
	dispatch(register(data))
}

const onChange =(e)=>{
	setUser({...user,[e.target.name]: e.target.value})
	//console.log(user);
}

	return (
		<Fragment>
			<Metadata title={'Register User'} />
			<div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler} encType='application/json'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" 
						name='name'
						value={name}
						onChange={onChange} />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email'
								value={email}
								onChange={onChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
								name='password'
                value={password}
								onChange={onChange}/>
            </div>

  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
							disabled={loading ? true :false}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
		</Fragment>
	)
}

export default Register
