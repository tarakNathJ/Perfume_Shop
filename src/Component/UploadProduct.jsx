import axios from 'axios';
import React,{useState} from 'react'
import {useSelector} from 'react-redux';

function UploadProduct() {
	const UserData = useSelector((store) => store.ProfileData);
	const [Loder,SetLoder] = useState(true);
	const [ErrorInFromData,SetFromDate] = useState({})
	const [ProductImage,setProductImage] = useState('');
	const [FromData,SetFromData] = useState({
		title: '',
		price: '',
		description: ''
	})
	const OnchangeHandeler = (event) => {
		const {name,value} = event.target
		SetFromData({
			...FromData,[name]: value
		})
	}


	const OnsubmitHandeler = async (event) => {
		event.preventDefault();

		const ChackingVariable = {};

		if(!FromData.title.trim()) {
			ChackingVariable.title = "enter your Title Name "
		}

		if(!FromData.price.trim()) {
			ChackingVariable.price = "enter your Price Name "
		}

		if(!FromData.description.trim()) {
			ChackingVariable.description = "enter your description Name "
		}
		SetFromDate(ChackingVariable);
		if(Object.keys(ChackingVariable).length === 0) {

			await UploadProduct();
		}
	}

	const UploadProduct = async () => {
		const controller = new AbortController();
		const ProductUploadData = new FormData()
		try {
			SetLoder(false);
			ProductUploadData.append("Thumbnel",ProductImage);
			ProductUploadData.append("Title",FromData.title);
			ProductUploadData.append("Price",FromData.price);
			ProductUploadData.append("description",FromData.description);
			const ResponceApi = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/CreateProduct`,ProductUploadData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${UserData.data.accessToken}`
					}
				},
				{
					signal: controller.signal
				}
			)
			
			alert("Product Upload success fully")
			SetLoder(true);
		} catch(error) {
			alert("Product Upload failed")
			if(axios.isCancel(error)) {
				console.log('request canceled',error.message);
				return
			}
		}
	}
	return (
		<div className='  h-[100%] w-full overflow-hidden bg-white  flex justify-center pt-8 cursor-pointer shadow-inherit bg-no-repeat bg-cover relative overflow-y-auto '>
			<div className='z-10 flex w-[90%] h-[70%] justify-center items-center'>
				<div className='h-[100%] w-[40%] bg-green-50/40 shadow-md  shadow-slate-300  rounded-3xl rounded-tl-3xl z-0 '>
					<h2 className='  text-2xl text-center mt-2 italic font-bold'>Upload Product</h2>
					<div className=' mt-8'>
						<form onSubmit={OnsubmitHandeler} action="">
							<div className=' flex flex-col justify-center items-center px-6 '>
								<div className=' flex flex-col  gap-10 '>
									<div className=' text-left flex flex-col  relative'>

										<input type="text" required onChange={OnchangeHandeler} name='title' autoComplete='off' autoCorrect='on' className='w-[100%] h-8 text-gray-600  bg-transparent  border-2 border-b-blue-500 border-x-transparent border-t-transparent   text-xl  text-right  focus:outline-none peer  ' />
										<span className='text-xl absolute font-medium pl-2 peer-focus:-translate-y-6 duration-200 peer-valid:-translate-y-6 '>Title</span >
										{/*{FullFillError.email && <span className='text-red-500 '>{FullFillError.email}</span>}*/}
									</div>
									<div className='-mt-4 text-left flex flex-col gap-2'>

										<input required type="number" onChange={OnchangeHandeler} name='price' autoComplete='off' autoCorrect='off' className=' w-[100%] h-8 text-gray-600  bg-transparent  border-2 border-b-blue-500 border-x-transparent border-t-transparent   text-xl text-right  focus:outline-none peer ' />
										<span className='text-xl absolute font-medium pl-2 peer-focus:-translate-y-6 duration-200 peer-valid:-translate-y-6  '>Price</span>
										{/*{FullFillError.password && <span className='text-red-500 '>{FullFillError.password}</span>}*/}
									</div>
									<div className='-mt-4 text-left flex flex-col gap-2'>

										<input required type="text" onChange={OnchangeHandeler} name='description' autoComplete='off' autoCorrect='off' className=' w-[100%] h-8 text-gray-600   bg-transparent border-2 border-b-blue-500 border-x-transparent border-t-transparent   text-xl text-right  focus:outline-none peer ' />
										<span className='text-xl absolute font-medium pl-2 peer-focus:-translate-y-6 duration-200 peer-valid:-translate-y-6  '>description</span>
										{/*{FullFillError.password && <span className='text-red-500 '>{FullFillError.password}</span>}*/}
									</div>


								</div>

							</div>

							<div className='mt-8  flex flex-col  justify-center items-center gap-4'>
								<input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
								<button type="submit" className={` w-[100px] h-10 rounded-lg  font-medium  text-xl ${Loder === false ? " bg-slate-400 cursor-wait" : "bg-yellow-400/70"} `}>Enter</button>
								{/*<Link to={'/SignUp'} className=' text-blue-600  underline font-semibold mt-2'> Sign Up </Link>*/}
							</div>

						</form>
					</div>
				</div>

			</div>





		</div>
	)
}

export default UploadProduct

