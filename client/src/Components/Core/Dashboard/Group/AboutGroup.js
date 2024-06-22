import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoIosPersonAdd } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { toast } from 'react-hot-toast';
import ViewGroupDailyExpense from './ViewGroupDailyExpense';
import GroupMonthlyExpenseGraph from './GroupMonthlyExpenseGraph';
import GroupMemberCard from '../../../Common/GroupMemberCard';
import GroupRecentExpenses from './GroupRecentExpenses';
import { viewGroupDailyExpenses, viewGroupMonthlyExpenses, viewGroupRecentExpense } from '../../../../Services/operations/expense';
import { useNavigate, useParams } from 'react-router-dom';
import AddMemberModal from './Modals/AddMemberModal';
import CreateExpenseModal from './Modals/CreateExpenseModal';
import { viewGroup } from '../../../../Services/operations/group';
import { formatDate } from '../../../../Utils/DateFormatter';
function AboutGroup() {
  const {token} = useSelector((state) => state.auth);
  let {id} = useParams();
  id = id.substring(1);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [monthlyExoenseData, setMonthlyexpenseData] = useState([]);
  const [dailyExpenseData, setDailyExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const nevigate = useNavigate();
  const [group, setGroup] = useState(null);
  const fetchData = async() => {
    const toastId = toast.loading("Loading....");
    setLoading(true);
    try {
      const [groupRes, recentExpenses, dailyExpense, monthlyExpense] = await Promise.all([
        viewGroup({groupId : id}),
        viewGroupRecentExpense({groupId : id}, token),
        viewGroupDailyExpenses({groupId : id}, token),
        viewGroupMonthlyExpenses({groupId : id}, token)
      ])
      
      setGroup(groupRes.group)
      setRecentExpenses(recentExpenses.data)
      setDailyExpenseData(dailyExpense.data)
      setMonthlyexpenseData(monthlyExpense.data)
    } catch (error) {
      console.log("Error occured while fetching data for about group page", error.message)
    }
    finally{
      toast.dismiss(toastId);
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchData();
  },[addExpenseModal, addMemberModal])  
  if(!group){
    return <div className='loader'></div>
  }
  
  return (
    <div>
      <div className='flex flex-col gap-10'>
        <div>
          <p className='text-white text-[24px] font-semibold'>{group.groupName}</p>
        </div>

        <div className='flex -mt-3 gap-5 justify-center flex-wrap md:justify-end items-center'>
          <button onClick={() => (nevigate(`/dashboard/aboutGroup/updateGroup/${group._id}`))} className='flex gap-1 text-[14px] text-white-100 hover:border hover:border-gray-500 hover:bg-black-400 hover:scale-90 transition-all duration-500 shadow-sm shadow-gray-600 border border-gray-600 bg-gray-700 justify-center items-center px-4 py-1 rounded-md'>
            <MdOutlineBrowserUpdated className='text-[15px]'/>
           <p>Update</p>
          </button>
          <button onClick={() => (nevigate(`/dashboard/aboutGroup/balanceSheet/${group._id}`))} className='flex gap-1 text-[14px] text-white-100 hover:border hover:border-gray-500 hover:bg-black-400 hover:scale-90 transition-all duration-500 shadow-sm shadow-gray-600 border border-gray-600 bg-gray-700  justify-center items-center px-4 py-1 rounded-md'>
            <GrTransaction />
            <p className='whitespace-nowrap'>Balance Sheet</p>
          </button>
          <button onClick={()=>{setAddMemberModal(true)}} className='flex gap-1 text-[14px] text-white-100 hover:border hover:border-gray-500 hover:bg-black-400 hover:scale-90 transition-all duration-500 shadow-sm shadow-gray-600 border border-gray-600 bg-gray-700  justify-center items-center px-4 py-1 rounded-md'>
            <IoIosPersonAdd></IoIosPersonAdd>
            <p className='whitespace-nowrap'>Add Member</p>
          </button>
          <button onClick={()=>(setAddExpenseModal(true))} className='flex gap-1 text-[14px] text-white-100 hover:border hover:border-gray-500 hover:bg-black-400 hover:scale-90 transition-all duration-500 shadow-sm shadow-gray-600 border border-gray-600 bg-gray-700  justify-center items-center px-4 py-1 rounded-md'>
            <MdAdd></MdAdd>
            <p className='whitespace-nowrap'>Add Expense</p>
          </button>
        </div>
        
        <div className='flex flex-col gap-3'>
          <p className='text-[18px] text-white-100 font-semibold'>About Group</p>
          <div className='flex gap-5 flex-col md:flex-row justify-start'>
          <div className='md:w-[65%] flex flex-col gap-5'>
              <ViewGroupDailyExpense groupId={id} expenseData={dailyExpenseData}></ViewGroupDailyExpense>
              <GroupMonthlyExpenseGraph groupId={id} expenseData={monthlyExoenseData}></GroupMonthlyExpenseGraph>
          </div> 

          <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-3 border text-gray-400 border-gray-500 h-[20.3rem] overflow-y-auto rounded-md px-7 py-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500'>
                <div>Owner : {group.groupOwber}</div>
                <div>Created On : {formatDate(group.createdAt)}</div>
                <div>Group Total : {group.groupTotal}</div>
                <div>Description : {group.groupDescription}</div>
                <div>Currency : {group.groupCurrency}</div>
              </div>
              <div className='flex flex-col gap-6 border border-gray-500 h-[20.3rem] overflow-y-auto rounded-md px-7 py-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500'>
                  <p className='text-white-100 text-[15px]'>Group Members</p>
                  {
                    group.groupMembers.map((member, index)=>(
                      <GroupMemberCard key={index} member={member}></GroupMemberCard>
                    ))
                  }
              </div>
            </div>
          </div>

        </div>
        <div className='flex flex-col gap-6'>
          <p className='text-[18px] text-white-100 font-semibold'>Recent Expense</p>
          {
            !loading && recentExpenses.length==0 && (
              <div className='text-[16px] text-gray-400'>You haven't created any expense yet</div>
            )
          }
          {
            !loading && recentExpenses.length>0 && (
              <GroupRecentExpenses recentExpenses={recentExpenses}> </GroupRecentExpenses>
            )
          }
        </div>
      </div>
      {
        addMemberModal && (<AddMemberModal id={id} groupName={group.groupName} groupMembers={group.groupMembers} setAddMemberModal={setAddMemberModal}></AddMemberModal>)
      }
      {
        addExpenseModal && (<CreateExpenseModal setAddExpenseModal={setAddExpenseModal}></CreateExpenseModal>)
      }
    </div>
  )
}

export default AboutGroup