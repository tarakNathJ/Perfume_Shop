import React,{useEffect,useState} from 'react'
import SingleProduct from './SingleProduct'
import SingalProduct2 from './SingalProduct2'
import {useSelector} from 'react-redux';
import axios from 'axios';

function OrderDe() {
	const [orderConfirm,SetOrderConfirm] = useState([]);
	const [orderShipt,SetOrderShipt] = useState([]);
	const UserData = useSelector((store) => store.ProfileData);

	useEffect(() => {

		; (async () => {
			const Controller = new AbortController();
			try {

				const ResponceApi = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/ShowAllOrder`,
					{
						Status1: "orderConfirm",
						Status2: "shipped"
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
				SetOrderConfirm(ResponceApi.data.data.Order);
				SetOrderShipt(ResponceApi.data.data.Order2)
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

		})()

		return () => {
		};
	},[]);


	return (
		<div className='w-full h-full  overflow-auto flex flex-col justify-between'>
			<div className='w-full  h-[47%]  '>
				<h1 className=' text-2xl font-sans font-bold text-gray-900 '>Upcommign Order</h1>

				<div className='w-[90%] h-full overflow-y-auto  '>
					<div className=' flex justify-evenly items-center w-full  h-[50px] border-2 border-slate-400 bg-slate-200 mt-[2%] rounded-t-md'>
						<span> productID </span>
						<span> paymentID </span>
						<span> status </span>
						<span>  </span>
					</div>
					{
						orderConfirm.map((data) => <SingleProduct key={data} data={data} />)
					}


				</div>
			</div>
			<div className='w-full  h-[47%]  '>
				<h1 className=' text-2xl font-sans font-bold text-gray-900 '>Seft Order</h1>
				<div className='w-[90%] h-full overflow-y-auto  '>
					<div className=' flex justify-evenly items-center w-full  h-[50px] border-2 border-slate-400 bg-slate-200 mt-[2%] rounded-t-md'>
						<span> productID </span>
						<span> paymentID </span>
						<span> status </span>
						<span>  </span>
					</div>
					{
					orderShipt.map((data)=><SingalProduct2 key={data._id} data={data} />)
					}

				</div>
			</div>
		</div>
	)
}

export default OrderDe