import React from 'react'
import SingleProductForAllPerfume from './SingleProductForAllPerfume';
import {useLoaderData} from 'react-router-dom';



function AllPerfume() {
	const {data} = useLoaderData();

	return (
		<div className='  w-full h-full bg-green-50 overflow-x-hidden overflow-y-auto flex flex-col justify-start gap-8 '>
			<div className=' mt-[2%] w-full h-32 bg-green-300  rounded-2xl flex justify-center items-center  rotate-1 '>
				<div className='w-[99%] h-32  bg-gradient-to-r from-yellow-200 flex justify-center to-purple-400-400 rounded-2xl -rotate-1' >
					<h1 className=' font-semibold items-center  pt-6 text-6xl '>SHOP BY BRAND</h1>
				</div>
			</div>

			{/* product part in your data */}
			<div className=' flex flex-wrap  justify-evenly  gap-[20px]  bg-priceBer mb-[80px] '>
				{
					data.map((SingleProduct) => <SingleProductForAllPerfume key={SingleProduct._id} SingleProduct={SingleProduct} />)
				}
			</div>
			



		</div>
	)
}

export default AllPerfume

