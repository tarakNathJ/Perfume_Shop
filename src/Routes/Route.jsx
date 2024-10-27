import {createBrowserRouter,Link} from 'react-router-dom';
import App from '../App';
import Home from '../Information/Home';
import DaseBordHomePage from '../Component/DaseBord/DaseBordHomePage';
import LogIn from '../Information/LogIn'
import OTP from '../Information/OTP';
import SignUp from '../Information/SignUp';
import Profile from '../Information/Profile';
import AllPerfume from '../Component/AllPerfume';
import ProductBuy from '../Component/ProductBuy';
import Card from '../Information/Card';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/LogIn',
				element: <LogIn />
			},

			{
				path: '/signUp',
				element: <SignUp />
			},
			{
				path: '/OTP',
				element: <OTP />
			},
			,{
				path: '/Profile',
				element: <Profile />
			},
			{
				path: '/DaseBord',
				element: <DaseBordHomePage />,
			},
			{
				path: '/Product',
				element: <AllPerfume />,
				loader: () => fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/allData`)
			},
			{
				path: '/productBuy',
				element: <ProductBuy />
			},
			{
				path: '/Card',
				element: <Card/>
			}

		]
	},

])

export default Router;