import axios from 'axios';
import React,{useState} from 'react'
import {FaRupeeSign} from "react-icons/fa";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function ProductBuy() {
	const ProductDetails = useSelector((store) => store.SingleProduct);
	const UserData = useSelector((store) => store.ProfileData);
	const Navigation = useNavigate();
	const [status,SetStatus] = useState(true);
	const [ErrorInOrderCreation,SetErrorInOrderCreate] = useState({});
	const [ErrorInVarify,SetErrorInVerify] = useState({});




	////loder script
	const LoadScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);

		});
	};


	const ProductBuyHandeler = async() => {
		if(!UserData.data) {
			Navigation('/LogIn')
		}
		await handlePayment() ;
	}

	// handlePayment Function
	const handlePayment = async () => {
		await LoadScript('https://checkout.razorpay.com/v1/checkout.js');
		const Controller = new AbortController();
		try {
			SetStatus(false);
			const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/PaymentGetWaya`,{
				Amount: ProductDetails.data.price
			},{
				headers: {
					'Content-Type': 'application/json'
				}
			},{
				signal: Controller.signal
			})

			SetStatus(true);
			handlePaymentVerify(Responce.data.data.order,Responce.data.data.Key);

		} catch(error) {
			SetStatus(true);
			SetErrorInOrderCreate(error);
			if(axios.isCancel(error)) {
				console.log('request IsCanceled',error.message);
				return
			}
			if(axios.isAxiosError(error)) {
				console.log("request Canceled  :-",error);
				return
			}
		}
	}


	// Varify payment function 
	const handlePaymentVerify = async (data,KEY) => {
		SetStatus(false);
		const options = {
			key: KEY,
			amount: data.amount,
			currency: data.currency,
			name: "Store",
			description: "Test Transaction",
			order_id: data.id,

			handler: async (response) => {

				const Controller = new AbortController();
				try {


					SetStatus(false);
					const responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/PaymentVarify`,{
						razorpay_order_id: response.razorpay_order_id,
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_signature: response.razorpay_signature,
						userID: UserData.data.user._id,
						productID: ProductDetails.data._id,
						amount: ProductDetails.data.price
					},{
						headers: {
							'Content-Type': 'application/json'
						}
					},{
						signal: Controller.signal
					})
					SetStatus(true);
					

				} catch(error) {
					SetStatus(true);
					SetErrorInVerify(error);
					if(axios.isCancel(error)) {
						console.log('request 2canceled',error.message);
						return
					}
					if(axios.isAxiosError(error)) {
						console.log("request 3canceled  :-",error);
						return
					}

				}
			}
		};

		const rzp1 = new window.Razorpay(options);

		await rzp1.open();
	}




	return (
		<div className='pt-[2%] pb-[2%] flex h-full w-full  justify-between overflow-x-hidden   overflow-y-auto relative   bg-green-50' >
			{/* left part  */}
			<div className='  h-[650px] overflow-hidden  w-[45%]'>
				<div className='  h-full  w-[100%] bg-green-50 flex   '>
					<div className=' h-[550px] w-[20%]  border-r-2 border-black'>

					</div>
					<div className=' h-[600px] w-[80%]  flex flex-col items-center justify-between  '>
						<div className=' w-[90%] h-[480px] mt-4 overflow-hidden'>
							<img className=' w-[90%] h-[480px]  object-contain overflow-hidden leading-loose ' src={ProductDetails.data.image_Url} alt="" />
						</div>
						<div className=' flex gap-10 justify-center mb-6 ' >
							<button className={` bg-yellow-500  w-[200px] h-10 rounded-[5px]  text-xl font-semibold text-white`}>ADD TO CART</button>
							<button onClick={ProductBuyHandeler} className={`bg-orange-500   h-10 w-[200px] rounded-[5px] text-xl font-semibold text-white`}>BUY NOW</button>
						</div>

					</div>
				</div>
			</div>
			{/* right part */}
			<div className='h-full w-[54%]  flex flex-col mt-14 text-left '>
				{/* Show product name and product brand name */}
				<div className='h-[150px] w-[95%] '>
					<h3 className=' text-black text-[35px]  font-bold'>{ProductDetails.data.title}</h3> <br />

					<div className=' flex gap-4 text-[18px]'>
						<div className=' w-6 h-6 bg-black rounded-full '></div>
						<h4 className=' text-blue-700 text-xl'>Visit the CORVE Brand - Perfume Store </h4>
					</div><br />
					<hr className=' border-black border-[1px] ' />
				</div>
				{/* show product price and EMI related information */}
				<div className=' pt-4 flex flex-col gap-4 w-[95%]'>
					<div className='flex gap-4'>
						<h2 className=' text-3xl font-bold text-green-700 font-mono'>-12%</h2>
						<h2 className=' text-4xl font-bold  flex justify-center items-center '><FaRupeeSign /> {ProductDetails.data.price}</h2>
					</div>
					<div className=' text-xl text-samibold'>
						{ProductDetails.data.description}
					</div>
					<hr className=' border-black border-[1px] ' />
				</div>

				<div className='w-full h-[500px] bg-transparent overflow-y-auto overflow-x-hidden '></div>


				{/* Brand or company provide same service  */}

			</div>

		</div>
	)
}

export default ProductBuy