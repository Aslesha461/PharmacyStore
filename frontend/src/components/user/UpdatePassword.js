import React from 'react'
import {useState,useEffect,Fragment} from 'react'
import { useAlert } from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import Metadata from '../layouts/Metadata'
import {updatePassword,loadUser , clearErrors} from '../../actions/userActions'
import {UPDATE_PASSWORD_RESET} from '../../constants/userConstants'

const UpdatePassword = ({history}) => {

	const [oldPassword,setOldPassword] = useState('');
	const [password,setPassword] = useState('');
	const alert =useAlert();
	const dispatch=useDispatch();

	const {user}=useSelector(state=>state.auth);
	const {error,isUpdated,loading}=useSelector(state=>state.user);

useEffect(() => {
	
	/*if(user){
		setPassword(user.password);
	}*/
	if(error){
		alert.error(error);
		dispatch(clearErrors());
	}

	if(isUpdated){
		console.log('success');
		alert.success('Password Updated Successfully');
		dispatch(loadUser());
     history.push('/profile');
		 
		dispatch({
			type:UPDATE_PASSWORD_RESET
		})
	}
}, [dispatch,alert,error,history,isUpdated,user])

const submitHandler=(e) =>{
	e.preventDefault();

	const data={oldPassword,password}
	
	//console.log(data);
	dispatch(updatePassword(data))
}

	return (
		<Fragment>
			<Metadata title={'Change Password'} />
			<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
																onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
																onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" 
												className="btn update-btn btn-block mt-4 mb-3"
												disabled={loading ? true :false}>
													Update Password
													</button>
                    </form>
                </div>
            </div>

			
		</Fragment>
	)
}

export default UpdatePassword
