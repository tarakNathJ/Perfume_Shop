import axios from 'axios';
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {Link,useNavigate} from 'react-router-dom'
import { UserProfileData } from "../Redux/UserProfileData";


function LogIn() {

	const Dispatch = useDispatch();
	const Navigate = useNavigate();
	const [FullFillError,setFullFill] = useState({});
	const [loding,SetLoding] = useState(true);
	const [Error,SetError] = useState(false);

	// declear state to from data store
	const [FromData,SetFromData] = useState({
		email: "",
		password: ""
	})

	// to store login from data
	const OnchangeHandeler = (event) => {
		const {name,value} = event.target
		SetFromData({
			...FromData,[name]: value
		})

	}


	// to chack data are full fill or not  then API call request 
	const OnsubmitHandeler = async (event) => {
		event.preventDefault();
		const Validation = {}
		if(!FromData.email.trim()) {
			Validation.email = "enter your email";
		}
		if(!FromData.password.trim()) {
			Validation.password = "enter your Password";
		}
		setFullFill(Validation);
		if(Object.keys(Validation).length === 0) {
			await APIcall()
		}
	}



	// api call for 
	const APIcall = async () => {
		const controller = new AbortController();

		try {
			SetLoding(false);
			SetError(false);
			const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/logIn`,{
				email: FromData.email,
				password: FromData.password

			},{
				headers: {
					'Content-Type': 'application/json',
				}
			},{
				signal: controller.signal
			})

			SetLoding(true);
			Dispatch(UserProfileData(Responce.data.data));
			Navigate('/');
			alert("success fully complete")
		} catch(Error) {
			
			SetLoding(true)
			SetError(true);
			alert("wrong user try again .")
			if(axios.isCancel(Error)) {

				return
			}
			if(axios.isAxiosError(Error)) {
				console.log(Error)
				return
			}
			alert("faled..")
		}
	}




	return (
		<div className=' h-[600px] w-full overflow-x-hidden bg-green-50 flex flex-1 flex-wrap justify-center pt-8 cursor-pointer shadow-inherit '>
			<div className='h-[400px] w-[300px] bg-white/90 rounded-tl-3xl rounded-bl-3xl shadow-lg shadow-slate-500 '>
				<h2 className='text-2xl mt-2 text-center  italic font-bold'>LOG IN </h2>
				<div className=' mt-16'>
					<form onSubmit={OnsubmitHandeler} action="">
						<div className=' flex justify-between items-center px-6 '>
							<div className=' flex flex-col  gap-10 '>
								<div className=' text-left flex flex-col  relative'>

									<input type="text" required onChange={OnchangeHandeler} name='email' autoComplete='off' autoCorrect='on' className=' w-[95%] h-8 text-gray-600   border-2 border-b-blue-500 border-x-transparent border-t-transparent   text-xl  text-right  focus:outline-none peer bg-inherit ' />
									<span className='text-xl absolute font-medium pl-2 peer-focus:-translate-y-6 duration-200 peer-valid:-translate-y-6 '>Email</span >
									{FullFillError.email && <span className='text-red-500 '>{FullFillError.email}</span>}
								</div>
								<div className='-mt-4 text-left flex flex-col gap-2'>

									<input required type="password" onChange={OnchangeHandeler} name='password' autoComplete='off' autoCorrect='off' className=' w-[95%] h-8 text-gray-600   border-2 border-b-blue-500 border-x-transparent border-t-transparent   text-xl text-right  focus:outline-none peer bg-inherit ' />
									<span className='text-xl absolute font-medium pl-2 peer-focus:-translate-y-6 duration-200 peer-valid:-translate-y-6  '>Password</span>
									{FullFillError.password && <span className='text-red-500 '>{FullFillError.password}</span>}
								</div>
							</div>
						</div>

						<div className='mt-8 flex flex-col justify-center items-center'>
							<button type="submit" className={` w-[100px] h-10 rounded-lg  font-medium ${ (loding=== false?' bg-slate-400 cursor-wait ':' bg-yellow-400/70' )} text-xl `}>Log In</button>
							<div className=' underline pt-2 font-sans font-bold text-blue-700'>
								<Link to={'/signUp'}>  SignUp </Link>
							</div>

						</div>

					</form>
				</div>
			</div>
			<div className=' h-[400px] w-[300px]  bg-blue-100  rounded-br-3xl overflow-hidden shadow-2xl shadow-slate-50  '>
				<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcdwnmHDAzjJ70T9zraeN993Fhv0B8tYslw&s' className=' object-cover h-full w-full overflow-hidden' alt="" />
			</div>
		</div>
	)
}

export default LogIn






