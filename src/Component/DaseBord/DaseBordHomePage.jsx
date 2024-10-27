import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import OrderDetails from './OrderDetails'
import UploadProduct from '../UploadProduct'
import Review from '../Review'
function DaseBordHomePage() {
	const [Section,ChangeSection] = useState("OrderDetails")

	const OnchageSection = (Data) => {
		ChangeSection(Data);
	}
	return (
		<div className=' flex flex-wrap justify-between bg-white h-screen w-screen  overflow-y-auto overflow-x-hidden'>
			<div className='h-full w-[18%]  flex flex-col justify-start gap-[8%] pt-[3%]  bg-green-50'>
				<button onClick={() => {OnchageSection("OrderDetails")}} className=' h-[50px] rounded-l-full text-stone-700 hover:text-black  text-xl font-semibold font-sans  hover:bg-white hover:duration-500  '>Order Details</button>
				<button onClick={() => {OnchageSection("UploadProduct")}} className=' h-[50px] rounded-l-full text-stone-700 hover:text-black  text-xl font-semibold font-sans  hover:bg-white hover:duration-500  '>Upload Product</button>
				<button onClick={() => {OnchageSection("Review")}} className=' h-[50px] rounded-l-full text-stone-700 hover:text-black  text-xl font-semibold font-sans  hover:bg-white hover:duration-500  '>Review</button>
			</div>
			<div className='h-full w-[80%] '>
				{Section == "OrderDetails" ? <OrderDetails/> : null}
				{Section == "UploadProduct" ? <UploadProduct /> : null}
				{Section == "Review" ? <Review/> : null}
			</div>

		</div>
	)
}

export default DaseBordHomePage