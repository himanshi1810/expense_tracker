import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Core/Dashboard/Sidebar';

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return (
      <div className='w-full flex justify-center items-center'>Loading..............</div>
    )
  }

  return (
    <div className='relative overflow-hidden flex min-h-[calc(100vh-2rem)]'>
      <Sidebar />
      <div className="h-[calc(100vh-2rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10 overflow-y-auto"> {/* Apply overflow-y: auto here */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
