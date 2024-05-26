import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from "../../assets/Logo/logo.png"
import { Link, useLocation, matchPath } from 'react-router-dom';
import ProfileDropDown from '../Core/Auth/ProfileDropDown';
import { NavbarLinks } from '../../data/navbarLinks';
import { VscMenu } from "react-icons/vsc";
import NavLianksReasponsive from './NavLianksReasponsive';
import { setShowSideBar } from '../../Reducer/Slices/sidebarSlice';

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className='bg-black-400 border-b-gray-400'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        {/* Logo */}
        <div className='flex flex-shrink-0 gap-4 justify-center items-center'>
          
        {/* <NavLianksReasponsive></NavLianksReasponsive> */}
          <VscMenu className='block md:hidden text-white' onClick={()=>dispatch(setShowSideBar(true))}></VscMenu>
          <img src={Logo} className='w-[60px] h-[30px] hidden md:block'></img>
        </div>

        {/* Navigation Links */}
        <nav className='justify-center hidden md:flex items-center flex-grow md:flex-grow-0'> {/* Responsive navigation */}
          {NavbarLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-all duration-300 ${
                location.pathname === item.path ? 'text-blue-500' : ''
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Login/Signup & Profile */}
        <div className='flex items-center'>
          {token === null && (
            <>
              <Link to={"/signup"}>
                <button className='bg-blue-400 text-white px-3 py-1 rounded-md text-[0.875rem] tracking-wide hover:bg-black-400 hover:border-[1px] hover:border-gray-400 transition-all duration-500 mr-2'>
                  Signup
                </button>
              </Link>
              <Link to={"/login"}>
                <button className='bg-blue-400 text-white px-3 py-1 rounded-md text-[0.875rem] tracking-wide hover:bg-black-400 hover:border-[1px] hover:border-gray-400 transition-all duration-500'>
                  Login
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
