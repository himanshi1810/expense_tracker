import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from 'react-icons/md';

function SidebarLinksComp({ item }) {
  const location = useLocation();
  const isActive = location.pathname === item.path; // Calculate active state for styling
  const DynamicIcon = Icons[item.Icon]; // Dynamically import the appropriate icon
  
  return (
    <div className='text-gray-400 flex gap-2 text-[16px]'>
      <NavLink
        to={item.path}
        className={`${isActive ? "text-white-100" : "text-gray-400"} flex gap-3 text-[16px] items-center justify-start`}
      >
        {DynamicIcon && <DynamicIcon />}
        <div>{item.title}</div>
      </NavLink>
    </div>
  );
}

export default React.memo(SidebarLinksComp);
