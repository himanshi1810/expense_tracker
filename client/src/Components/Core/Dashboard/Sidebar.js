import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { sidebarLinks } from '../../../data/sidebarLinks';
import SidebarLinksComp from './SidebarLinksComp';
import { RiLogoutBoxLine } from "react-icons/ri";
import Logo from "../../../assets/Logo/logo.png";
import { logout } from '../../../Services/operations/authAPI';
import Modal from '../../Common/Modal';
import { VscMenu } from 'react-icons/vsc';
import { setShowSideBar } from '../../../Reducer/Slices/sidebarSlice';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { NavbarLinks } from '../../../data/navbarLinks';

function Sidebar() {
  const navigate = useNavigate();
  const { showSideBar } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const [cofirmationModal, setConfirmationModal] = useState(null);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(setShowSideBar(false));
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      className={`md:min-h-[calc(100vh-2rem)] ${
        showSideBar ? "fixed md:static flex z-40 top-0 h-screen" : "hidden md:flex"
      } md:flex overflow-y-hidden min-w-[200px] border-r-[1px] pl-6 border-r-gray-400 gap-2 flex-col text-gray-400 bg-black-400 py-10`}
      ref={ref}
    >
      <div className='md:hidden flex justify-between text-[18px] pr-4 mb-5 -mt-[1rem]'>
        <img src={Logo} className='w-[40px] h-[20px]' />
        <IoCloseOutline onClick={() => dispatch(setShowSideBar(false))} />
      </div>

      <div className='flex md:hidden flex-col gap-3 justify-start items-start'>
        {NavbarLinks.map((item) => (
          <SidebarLinksComp key={item.id} item={item} />
        ))}
      </div>
      <div className='flex flex-col gap-3 justify-start items-start mt-2'>
        {sidebarLinks.map((item) => (
          <SidebarLinksComp key={item.id} item={item} />
        ))}

        <div
          onClick={() =>
            setConfirmationModal({
              title: "Logout",
              description: "Are you sure you want to logout",
              button1Text: "Logout",
              button1Handler: () => dispatch(logout(navigate)),
              button2Text: "Cancel",
              button2Handler: () => setConfirmationModal(null),
            })
          }
          className='flex gap-3 text-[16px] cursor-pointer items-center justify-start'
        >
          <RiLogoutBoxLine />
          <div>Logout</div>
        </div>
      </div>
      {cofirmationModal && <Modal modalData={cofirmationModal} />}
    </div>
  );
}

export default Sidebar;
