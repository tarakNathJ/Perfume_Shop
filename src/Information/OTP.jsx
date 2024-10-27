import axios from 'axios';
import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {UserDetails,RemoveUserDetails} from "../Redux/UserSignUpdata"
import {useNavigate} from 'react-router-dom';

function OTP() {

	const Userdate = useSelector((store) => store.UserSignUpdata);
	const [Otp,SetOtp] = useState(null);
	const Dispatch = useDispatch();
	const Navigate = useNavigate();

	// this handler call on our from is submited
	const onsubmitHandler = (event) => {
		event.preventDefault();
		if(Otp && Userdate.data.email) {
			VarifyOtpController();

		}
	}

	//varify otp controller
	const VarifyOtpController = async () => {
		const Controller = new AbortController();

		try {
			const responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/OTP`,{
				email: Userdate.data.email,
				Otp:Otp
			},{
				headers: {
					'Content-Type': 'application/json'
				}
			},
				{
					signal: Controller.signal
				})

			console.log(responce);
			Dispatch(RemoveUserDetails());
			Navigate('/LogIn');
			
		} catch(errro) {

			if(axios.isCancel(errro)) {
				console.log(errro);
				return
			}
			if(axios.isAxiosError(errro)) {
				console.log(errro);
				return
			}
		}

		//api clearence
		return () => {
			Controller.abort()
		}
	}
	return (
		<div className=' h-full w-full bg-green-50  flex items-center  '>
			<form onSubmit={onsubmitHandler} className='w-full h-[25%] flex  flex-col   items-center justify-between' >
				<h1 className='text-3xl text-gray-600 font-sans font-bold'>Enter your OTP</h1>
				<input type="number" onChange={(e) => SetOtp(e.target.value)} className='w-[25%] h-[40px]  bg-transparent  outline-none border-b-2 border-l-2 text-center  border-gray-700' />
				<button type="submit" className='py-2 px-8 bg-green-600  rounded-full text-xl font-semibold text-white hover:bg-green-500 duration-500 '> send </button>
			</form>
		</div>
	)
}

export default OTP