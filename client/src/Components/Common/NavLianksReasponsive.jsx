import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";

import { LuLayoutDashboard } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { VscMenu } from 'react-icons/vsc';
import { NavbarLinks } from '../../data/navbarLinks';

function NavLianksReasponsive() {
    const {user} = useSelector((state)=> state.profile);
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, ()=>setOpen(false));
    //if(!user)return null;
  return (
    <div className='block md:hidden'>
        <button onClick={()=>setOpen(true)} className='relative'>
            <div className='flex gap-4 justify-center items-center font-medium text-[20px]'>
                <VscMenu className='text-white'></VscMenu>
            </div>
            {
            open && (
                <div className='absolute top-[118%] left-[1rem] bg-black-400 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-gray-400' ref={ref}>
                    <div onClick={(e)=>e.stopPropagation} className='border-b-[1px] flex flex-col gap-2 justify-start items-start w-[7rem] px-4 py-3 border-b-gray-400'>
                        {
                            NavbarLinks.map((link, index) => (
                                <div>
                                    <Link to={link.link} index={index}>
                                        <div className='text-gray-400 w-[100%] text-[15px]'>
                                            {link.title}
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                   
                </div>
            )
        }
        </button>
        
    </div>
    )
}

export default NavLianksReasponsive