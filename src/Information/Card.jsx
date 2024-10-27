import React from 'react'

function Card() {
	``
	return (
		<div className='w-screen h-screen  pt-[2%]  flex  flex-col items-center  bg-green-50 '>
			<h1 className=' text-2xl font-sans font-bold text-gray-900 '>Order</h1>
			<div className='w-[90%] h-full overflow-y-auto  '>
				<div className=' flex justify-evenly items-center w-full  h-[50px] border-2 border-slate-400 bg-slate-200 mt-[2%] rounded-t-md'>
					<span> productID </span>
					<span> paymentID </span>
					<span> status </span>
					<span>  </span>
				</div>
				{/*{
					orderShipt.map((data) => <SingalProduct2 key={data._id} data={data} />)
				}*/}

			</div>
		</div>
	)
}

export default Card