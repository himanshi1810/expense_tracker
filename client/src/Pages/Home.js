import React from 'react'
import HomePageImage from '../assets/DashboardImage.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Home() {
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
            <div className='flex gap-2 flex-col px-4 justify-center items-start'>
                <div className='text-[28px] text-white-100 font-bold'>Hello !</div>
                <div className='text-[28px] text-white-100 font-bold'>
                    Welcome to
                    <span className='gradientText'> Expense Tracker</span>
                </div>
                <div className='text-gray-400 text-[16px] w-[80%]'>
                    Sharing Expense with your friends is simpler tham ever with Expense Tracker. 
                </div>
                <button onClick={onClickHandler} className='bg-blue-400 self-center md:self-start text-white-100 text-[1rem] mt-4 px-10 py-2 rounded-md hover:bg-black-400 hover:border hover:border-gray-400 transition-all duration-500'>Start Now</button>
            </div>
            <div to={token==null ? "/signup" : "/dashboard/aboutUser"}>
                <img src={HomePageImage} className='h-[34rem]'></img>
            </div>
        </div>
    </div>
  )
}

export default Home