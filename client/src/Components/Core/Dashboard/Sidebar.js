import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../../../data/sidebarLinks';
import SidebarLinksComp from './SidebarLinksComp';
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from '../../../Services/operations/authAPI';
import Modal from '../../Common/Modal';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cofirmationModal, setConfirmationModal] = useState(null);
  
  return (
    <div className='min-h-[calc(100vh-2rem)] overflow-y-hidden min-w-[200px] border-r-[1px] pl-6 border-r-gray-400 flex gap-2 flex-col text-gray-400 bg-black-400 py-10'>
      <div className='flex flex-col gap-3 justify-start items-start'>
      {sidebarLinks.map((item) => (
          <SidebarLinksComp key={item.id} item={item} />
      ))}
      
      <div
        onClick={() => setConfirmationModal({
          title : "Logout",
          description : "Are you sure you want to logout",
          button1Text : "Logout",
          button1Handler : () => dispatch(logout(navigate)),
          button2Text : "Cancel",
          button2Handler : () => setConfirmationModal(null)
        })}
        className='flex gap-3 text-[16px] cursor-pointer items-center justify-start'
      >
        <RiLogoutBoxLine />
        <div>Logout</div>
      </div>
      </div>
      {
        cofirmationModal && <Modal modalData={cofirmationModal}></Modal>
      }
    </div>
  );
}

export default Sidebar;
