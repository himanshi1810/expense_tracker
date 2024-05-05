import React from 'react'
import HomePageImage from '../assets/DashboardImage.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function About() {
  const {token} = useSelector((state) => state.auth)
    const nevigate = useNavigate();
    const onClickHandler = ()=>{
        if(!token){
            nevigate("/signup")
        }else{
            nevigate('/')
        }
    }
  return (
    <div className='w-11/12 mx-auto py-4'>
        <div className='flex flex-col md:flex-row justify-center items-center'>
            <div className='flex gap-2 flex-col px-4 justify-center items-start w-[50%]'>
                <div className='text-[28px] text-white-100 font-bold'>
                    Our Story For
                    <span className='text-blue-400'> Expense Tracker</span>
                </div>
                <div className='text-gray-400 text-[16px] '>
                  An expense tracker application serves as a digital tool to help individuals manage their finances efficiently. Its primary purpose lies in enabling users to track their expenses accurately, offering a comprehensive overview of their spending habits. By categorizing transactions and providing visual representations of financial data, such as 
                  charts and graphs, users gain valuable insights into their expenditure patterns.
                </div>
                <button onClick={onClickHandler} className='bg-blue-400 self-center md:self-start text-white-100 text-[1rem] mt-4 px-10 py-2  rounded-md hover:bg-black-400 hover:border hover:border-gray-400 transition-all duration-500'>Start Now</button>
            </div>
            <div to={token==null ? "/signup" : "/dashboard/aboutUser"}>
                <img src={HomePageImage} className='h-[34rem]'></img>
            </div>
        </div>
    </div>
  )
}
export default About