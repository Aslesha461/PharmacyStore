import React from 'react'
import {useState,useEffect,Fragment} from 'react'
import { useAlert } from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import Metadata from '../layouts/Metadata'
import {updateProfile,loadUser , clearErrors} from '../../actions/userActions'
import {UPDATE_PROFILE_RESET} from '../../constants/userConstants'

const UpdateProfile = ({history}) => {

	const [name,setName]= useState('');
	const [email,setEmail]=useState('');
	const alert =useAlert();
	const dispatch=useDispatch();

	const {user}=useSelector(state=>state.auth);
	const {error,isUpdated,loading}=useSelector(state=>state.user);

useEffect(() => {
	
	if(user){
		setName(user.name);
		setEmail(user.email);
	}

	if(error){
		alert.error(error);
		dispatch(clearErrors());
	}

	if(isUpdated){
		alert.success('Profile Updated Successfully');
		dispatch(loadUser());

		history.push('/profile');
		dispatch({
			type:UPDATE_PROFILE_RESET
		})
	}
}, [dispatch,alert,error,history,isUpdated,user])

const submitHandler=(e) =>{
	e.preventDefault();

	const data={name,email}
	//console.log(data);
	dispatch(updateProfile(data))
}


	return (
		<Fragment>
			<Metadata title={'Update User Profile'} />
			<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='application/json'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input type="name" id="name_field" className="form-control"
                                name='name'
                                value={name}
																onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input type="email" id="email_field" className="form-control"
                                name='email'
                                value={email}
																onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" 
												disabled={loading ? true :false}>
													Update
													</button>
                    </form>
                </div>
            </div>
			
		</Fragment>
	)
}

export default UpdateProfile
