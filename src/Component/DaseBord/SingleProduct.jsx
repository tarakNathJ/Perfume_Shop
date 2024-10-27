import axios from 'axios';
import React from 'react'
import {useSelector} from 'react-redux';


function SingleProduct({data}) {
	
	const UserData = useSelector((store) => store.ProfileData);

	const OnclickHandler = async () => {
		const Controller = new AbortController();
		try {
			const ResponceApi = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/ChangeOrderStatus`,
				{
					OrderId:data._id,
					Status:"shipped",	 
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${UserData.data.accessToken}`
					}
				},
				{
					signal: Controller.signal
				}
			)
			window.location.reload();
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
	}
	return (
		<div className=' flex justify-evenly items-center w-[100%] h-[50px] bg-slate-50 hover:bg-green-100 hover:duration-500 border-l-2  border-r-2 border-slate-400 '>
			<span>{data.productID} </span>
			<span> {data.paymentID} </span>
			<span> {data.status} </span>
			<span onClick={OnclickHandler} className=' cursor-pointer bg-blue-600 p-1 rounded-sm hover:bg-blue-500 hover:duration-500'>Order Shipped </span>
		</div>
	)
}

export default SingleProduct