import React from 'react'
import {useState,useEffect,Fragment} from 'react'
import { useAlert } from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import Metadata from '../layouts/Metadata'
import {resetPassword , clearErrors} from '../../actions/userActions'


const NewPassword = ({match,history}) => {

	const [password,setPassword]=useState('');
	const [confirmPassword,setConfirmPassword]=useState('');

	const alert=useAlert();
	const dispatch=useDispatch();

	const {error,success}=useSelector(state=>state.forgotPassword);

	useEffect(() => {
		if(error){
			alert.error(error);
			dispatch(clearErrors());
		}

		if(success){
			alert.success('Password Reset Success');
			history.push('/login');

		}
	}, [dispatch,alert,error,success,history]);

	const submitHandler=(e)=>{
		e.preventDefault();
		const data={password,confirmPassword}
		dispatch(resetPassword(match.params.token,data))
	}
	return (
		<Fragment>
			<Metadata title={'Reset-Password'} />
			<div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
														onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
														onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
												>
                        Set Password
                    </button>

                </form>
            </div>
        </div>
			
		</Fragment>
	)
}

export default NewPassword
