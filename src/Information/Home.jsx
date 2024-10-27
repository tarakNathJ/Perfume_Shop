
import React from 'react'
import {HiReply} from "react-icons/hi";
import {HiOutlinePhone} from "react-icons/hi";
import {HiMail} from "react-icons/hi";
import doc from '../assets/doc.png'



function Home() {
  return (
	<>

			<div className='w-full h-full flex flex-wrap bg-green-50 justify-around overflow-y-auto overflow-x-hidden'>
				{/* left contener */}
				<div className='w-[45%] h-full  flex flex-col justify-between'>
					<div className='w-full h-[68%]   flex justify-end flex-col gap-[5%] '>
						<div className=' w-full h-[40%]   flex flex-col justify-between items-start '>
							<p className='text-2xl font-medium mx-[5%] font-sans text-green-600 '>Welcome to your health care destination!</p>
							<h1 className='text-[35px] font-bold font-sans mx-[5%]'> Your <span className='text-green-600'> Health</span> ,Our Priority Expert <span className='text-green-600'> Care</span> You Can Trust!</h1>
						</div>
						<div className=' w-full h-[23%] '>
							<p className='text-xl font-sans mx-[5%]  font-medium  text-stone-600 '> Get the care you need with our friendly team of doctors and staff! We're here to help you feel better and stay healthy Learn about our services and reach out to us anytime
							</p>
						</div>
						<div className=' w-full h-[15%]  flex flex-wrap  justify-around'>
							<button className='py-2 px-8 bg-green-600  rounded-full text-xl font-semibold text-white hover:bg-green-500 duration-500 '>Make Appointment</button>
							<button className='py-2 px-8 bg-white rounded-full text-xl font-semibold text-green-600  hover:bg-slate-100  duration-500  '>Read More</button>
						</div>
					</div>
					<div className='w-full h-[30%] mx-[5%]  flex  items-end '>
						<div className='w-[57%] h-[95%] bg-stone-100 shadow-md shadow-slate-400  rounded-3xl  relative'>
							<div className=" absolute bg-white w-[60%] h-11 top-0 right-0 rounded-bl-2xl rounded-tr-2xl "></div>
							<div className=' absolute  text-white right-0 bottom-0 w-11 h-11 rounded-full bg-green-500 text-3xl  text-end flex  justify-center items-center rotate-90  '><HiReply /></div>
							<p className=' pl-[5%] pt-[2%] text-[20px] font-medium text-green-500' >Emergency</p>
							<p className='pt-[4%] pl-[5%] text-[18px] text-stone-700'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet exercitationem </p>
							<div className='w-[80%] h-[25%]  mt-[3%] flex flex-wrap justify-center items-center gap-2'>
								<div className='h-full w-[15%] bg-green-300 text-slate-100  rounded-full flex justify-center items-center text-2xl'><HiOutlinePhone /></div>
								<div>+91 7688706342</div>
							</div>
						</div>

					</div>
				</div>

				<div className=' relative w-[45%] h-full  flex justify-center items-center'>
					<div className=' absolute w-[60%] h-[60%] bg-green-500/40 rounded-bl-[50%] rounded-tr-[30%] rounded-tl-[90%] rounded-br-[50%]'></div>
					<div className=' absolute w-[60%] h-[60%] bg-transparent rounded-2xl'><img src={doc} className=" bg-transparent" alt="" /> </div>
					

				</div>


				<div className='w-full h-[100px]'></div>

			</div>
		</>
  )
}

export default Home




