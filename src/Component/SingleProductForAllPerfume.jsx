import React from 'react'
import {useDispatch} from 'react-redux'
import {SingleProductDetails} from '../Redux/SingleProductData'
import {useNavigate} from 'react-router-dom';

function SingleProductForAllPerfume({SingleProduct}) {
	const Dispatch = useDispatch();
	const Navigate = useNavigate();

	const OnclickHandler = () => {
		Dispatch(SingleProductDetails(SingleProduct));
		console.log("first")
		Navigate("/productBuy")
		console.log("first")
	}
	return (
		<div onClick={OnclickHandler} className='w-[23%] h-[350px] rounded-md shadow-md cursor-pointer  overflow-hidden bg-green-200  '>
			<div className='w-full h-[90%]  '><img className='w-full h-[89%] object-cover overflow-hidden leading-loose' src={SingleProduct.image_Url} alt="" /></div>
			<div className='w-full h-[10%]  text-xl text-center font-bold my-auto'>{SingleProduct.title}</div>
		</div>
	)
}

export default SingleProductForAllPerfume