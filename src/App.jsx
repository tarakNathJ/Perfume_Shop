import {useEffect,useState} from 'react'
import './App.css'
import {Link,Outlet, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {removeUserprofileData} from './Redux/UserProfileData'


function App() {
	const Dispatch = useDispatch();
	const Navigate = useNavigate();
	const UserData = useSelector((store) => store.ProfileData);
	
	const [LoginLogOut,SetLoginLogout] = useState(false);

	useEffect(() => {
		console.log();
		if(UserData.data.length == 0) {
			SetLoginLogout(true)

		} else {
			SetLoginLogout(false);

		}
		return () => {
		};
	},[UserData]);


	//log out controller
	const OnclickHandler = async () => {

		const Controller = new AbortController();

		try {
			const responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/logOut`,{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${UserData.data.accessToken}`
					}
				},
				{
					signal: Controller.signal
				})

			SetLoginLogout(true);
			Dispatch(removeUserprofileData());
			Navigate('/');

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

	const DashBordHandler = () => {
		if( (UserData.data.length != 0)&& (UserData.data.user.accountType == 'admin')) {
			Navigate('/DaseBord')
		} else {
			alert("this is admin route")
		}


	}

	return (
		<div className='h-screen w-screen overflow-hidden  '>
			<div className='w-full h-[60px] bg-green-50 flex text-white  justify-between items-center px-[5%]'>
				<div className='w-[130px] h-[50px]  flex justify-between items-center ju'>
					<div className='w-[50px] h-[50px] rounded-full  overflow-hidden flex text-green-500 '>
						<img src="https://png.pngtree.com/png-clipart/20230804/original/pngtree-abstract-green-vector-logo-for-perfumes-logo-element-spa-vector-picture-image_9617335.png" alt="" className=' object-cover w-full h-full' />
					</div>
					<h1 className='text-2xl text-green-500 font-sans font-bold  '>corve</h1>
				</div>
				<div className='h-[70%] w-[40%]  bg-white rounded-full shadow-md shadow-slate-300 flex  justify-between items-center px-[3%] '>
					<h1 className='hover:text-green-400 text-xl  text-slate-700  hover:underline  duration-500  cursor-pointer ' ><Link to={'/'}>Home</Link></h1>
					<h1 className='hover:text-green-400 text-xl  text-slate-700   hover:underline duration-500  cursor-pointer'><Link to={'/Product'}>Store</Link></h1>
					<h1 onClick={DashBordHandler} className='hover:text-green-400 text-xl  text-slate-700  hover:underline  duration-500  cursor-pointer'>DashBord </h1>

				</div>
				<div className='h-[70%] w-[10%]  bg-white rounded-full shadow-md shadow-slate-300 text-center  flex justify-center items-center '><h1 className='text-green-400 text-xl'> {LoginLogOut === true ? <Link to={'/LogIn'}>LogIn</Link> : <button onClick={OnclickHandler}>LogOut</button>} </h1></div>
			</div>
			<Outlet />
		</div >
	)
}

export default App
{/*<Link to={'/LogIn'}>LogIn</Link>*/}