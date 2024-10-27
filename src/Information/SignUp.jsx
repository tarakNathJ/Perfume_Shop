
import axios from 'axios';
import React from 'react'
import {useState} from "react"
import {useDispatch} from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import {UserDetails} from "../Redux/UserSignUpdata"
function SignUp() {
	// errors state collect error for sign up from data
	const [errors,setError] = useState("")
	const [response,setResponce] = useState(null);
	const [StatusSignUp,SetStatusSignUP] = useState(null);
	const [apiError,SetErrorSignup] = useState(null);
	

	const Navigate = useNavigate();

	const DisPatch = useDispatch();
	// set account type controller



	// declear a fromData to store sign up from data
	const [fromData,setFromData] = useState({
		FirstName: '',
		LastName: '',
		email: '',
		Password: '',
		ConformPassword: '',
	})





	//   controller : to store sign up from data
	const handleChange = (event) => {
		const {name,value} = event.target;
		setFromData({
			...fromData,[name]: value
		})

	}
	// this controller chack all data full fill for signup from
	const HandleSubmit = async (e) => {

		e.preventDefault()

		const ValiDationError = {}
		if(!fromData.FirstName.trim()) {
			ValiDationError.FirstName = "First Name is required"
		}
		if(!fromData.LastName.trim()) {
			ValiDationError.LastName = "Last Name is required"
		}
		if(!fromData.email.trim()) {
			ValiDationError.email = "email is required"
		}
		if(!fromData.Password.trim()) {
			ValiDationError.Password = "Password is required"
		}

		if(fromData.ConformPassword !== fromData.Password) {
			ValiDationError.ConformPassword = "Password are not Match"
		}
		setError(ValiDationError);
		if(Object.keys(ValiDationError).length === 0) {
			await SignUPHandeler();
			
		}
	}


	// api call to sign up
	const SignUPHandeler = async () => {
		const controller = new AbortController();
		try {
			SetStatusSignUP(false)

			const responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/signUp`,{
				userName: `${fromData.FirstName} ${fromData.LastName} `,
				email: fromData.email,
				password: fromData.Password,
				accountType: "customer",

			},{
				headers: {
					'Content-Type': 'application/json'
				}
			},
				{
					signal: controller.signal
				})

			
			setResponce(responce);
			DisPatch(UserDetails(responce.data.data));
			SetErrorSignup(false);
			SetStatusSignUP(true);
			Navigate('/OTP');
			

		} catch(error) {

			SetErrorSignup(true);
			if(axios.isCancel(error)) {
				console.log('request canceled',error);
				return
			}
			if(axios.isAxiosError(error)) {
				console.log("request canceled  :-",error);
			}

		}
		// api  clearence
		return () => {
			controller.abort()
		}
	}




	// // to redirct log in page
	const RedirectLoginPage = (value) => {
		if(value == true) {
			Navigate("/LogIn");
		}
	}



	return (
		<div className=' h-screen w-full overflow-x-hidden relative  bg-green-50 flex flex-wrap  justify-center pt-8'>

			<div className='h-[80%] w-[30%] bg-slate-50 rounded-tl-3xl rounded-bl-3xl  shadow-2xl '>


				{/* chose acount type   */}
				<div className=' flex mt-6 p-6 justify-between '>
					<h1 className=' text-2xl  text-gray-500 font-medium '>Sign Up</h1>

				</div>
				<div>
					<form onSubmit={HandleSubmit} action="">
						<div className=' flex flex-col gap-8 flex-wrap '>
							<div className=' flex  justify-evenly  '>

								<div className=' flex flex-col '>
									<input type="text" placeholder='first Name' name='FirstName' autoComplete='off' onChange={handleChange} className=' w-[170px] h-9  border-2 border-b-blue-400 text-xl  border-t-transparent border-x-transparent focus:outline-none bg-transparent text-center  rounded-md ' />
									{errors.FirstName && <span className='text-red-400'>{errors.FirstName}</span>}
								</div>
								<div className='flex flex-col'>
									<input type="text" placeholder='Last Name' name='LastName' autoComplete='off' onChange={handleChange} className=' w-[170px] h-9  border-2 border-b-blue-400 text-xl  border-t-transparent border-x-transparent focus:outline-none bg-transparent text-center  rounded-md ' />
									{errors.LastName && <span className='text-red-400'>{errors.LastName}</span>}
								</div>


							</div>
							<div className=' flex flex-col pl-6 flex-wrap  '>
								<div className=' flex gap-2'>
									<input type="email" placeholder='Email Address' name='email' autoComplete='off' onChange={handleChange} className=' w-[250px] h-9   border-2 border-b-blue-400 text-xl  border-t-transparent border-x-transparent focus:outline-none bg-transparent text-center  rounded-md ' />
									{/* <button onClick={SendOTPHandeler} className='w-20 h-8 rounded-lg  font-medium  bg-yellow-400'>Send OTP</button> */}
								</div>
								<div>
									{errors.email && <span className='text-red-400'>{errors.email}</span>}
								</div>


							</div>
							<div className=' flex  justify-evenly flex-wrap  '>

								<div className=' flex flex-col '>
									<input type="password" placeholder='Password' name='Password' onChange={handleChange} autoComplete='off' className=' w-[170px] h-9  border-2 border-b-blue-400 text-xl  border-t-transparent border-x-transparent focus:outline-none bg-transparent text-center  rounded-md ' />
									{errors.Password && <span className='text-red-400'>{errors.Password}</span>}
								</div>
								<div className='flex flex-col'>
									<input type="text" placeholder='conform Password' name='ConformPassword' onChange={handleChange} autoComplete='off' className=' w-[170px] h-9  border-2 border-b-blue-400 text-xl  border-t-transparent border-x-transparent focus:outline-none bg-transparent text-center  rounded-md ' />
									{errors.ConformPassword && <span className='text-red-400'>{errors.ConformPassword}</span>}
								</div>


							</div>



						</div>
						<div className=' pt-[10%] flex flex-col justify-center items-center '>
							<button type={`${StatusSignUp === false ? "" : "submit"}`} className={` w-[150px] h-10 rounded-lg  font-medium  text-xl ${StatusSignUp === false ? "bg-slate-400 cursor-wait" : "bg-yellow-400"} `}>Sign Up</button>
							<div className=' underline pt-2 text-blue-700 font-bold font-sans'>
								<Link to={'/LogIn'}>  Login </Link>
							</div>
						</div>
					</form>

				</div>



			</div>
			<div className=' h-[80%] w-[30%]  bg-blue-600/40  shadow-2xl rounded-br-3xl rounded-tr-3xl overflow-hidden  '>
				<img className=' object-cover h-full w-full overflow-hidden' src="https://cdn.basler-beauty.de/out/pictures/generated/product/3/980_980_100/1416669-Jean-Paul-Gaultier-Le-Beau-Le-Parfum-Eau-de-Parfum-Intense-125-ml.32fc2812.jpg" alt="" />
			</div>
		</div>

	)
}

export default SignUp