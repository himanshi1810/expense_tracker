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
import { viewGroupRecentExpense } from '../../../../Services/operations/expense';
import { useFetcher, useNavigate, useParams } from 'react-router-dom';
import AddMemberModal from './Modals/AddMemberModal';
import CreateExpenseModal from './Modals/CreateExpenseModal';
import { viewGroup } from '../../../../Services/operations/group';
function AboutGroup() {
  const {token} = useSelector((state) => state.auth);
  const {id} = useParams();
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const nevigate = useNavigate();
  const [group, setGroup] = useState(null);
  const getGroupRecentExpense = async() => {
    const toastId = toast.loading("Loading....");
    try {
      const data = {
        groupId : group._id
      }
      const res = await viewGroupRecentExpense(data, token);
      console.log(res);
      setRecentExpenses(res.data);
      
    } catch (error) {
      console.log("Error occured while fetching group recent expense : ", error.message);
    }
    toast.dismiss(toastId);
  }
  useEffect(()=>{
    
    const getGroupData = async () => {
      const toastId = toast.loading("Loading....");
      try {
        const data = {
          groupId : id.substring(1)
        }
        console.log("data : ", data);
        const res = await viewGroup(data);
        console.log("res",res);
        setGroup(res.group);
        //console.log(group)
      } catch (error) {
        console.log("Error occured while fetching group : ", error.message);
      }
      toast.dismiss(toastId);
    }
    getGroupData();
  }, [])
  useEffect(()=>{
    setLoading(true);
    getGroupRecentExpense();
    setLoading(false);
  }, [recentExpenses])
  if(!group){
    return <div className='loader'></div>
  }
  return (
    <div>
      <div>
        <div>
          <p>{group.groupName}</p>
        </div>
        <div className='flex  gap-5 justify-end items-center'>
          <button onClick={() => (nevigate(`/dashboard/aboutGroup/updateGroup/${group._id}`))} className='flex gap-1 text-[14px] text-white-100 hover:border hover:border-gray-500 hover:bg-black-400 hover:scale-90 transition-all duration-500 shadow-sm shadow-gray-600 border border-gray-600 bg-gray-700 justify-center items-center px-4 py-1 rounded-md'>
            <MdOutlineBrowserUpdated className='text-[15px]'/>
            Update
          </button>
          <button onClick={() => (nevigate(`/dashboard/aboutGroup/balanceSheet/${group._id}`))} className='flex gap-1 text-[14px] text-white-100 hover:border hover:border-gray-500 hover:bg-black-400 hover:scale-90 transition-all duration-500 shadow-sm shadow-gray-600 border border-gray-600 bg-gray-700  justify-center items-center px-4 py-1 rounded-md'>
            <GrTransaction />
            BalanceSheet
          </button>
          <button onClick={()=>{setAddMemberModal(true)}} className='flex gap-1 text-[14px] text-white-100 hover:border hover:border-gray-500 hover:bg-black-400 hover:scale-90 transition-all duration-500 shadow-sm shadow-gray-600 border border-gray-600 bg-gray-700  justify-center items-center px-4 py-1 rounded-md'>
            <IoIosPersonAdd></IoIosPersonAdd>
            Add Member
          </button>
          <button onClick={()=>{setAddExpenseModal(true)}} className='flex gap-1 text-[14px] text-white-100 hover:border hover:border-gray-500 hover:bg-black-400 hover:scale-90 transition-all duration-500 shadow-sm shadow-gray-600 border border-gray-600 bg-gray-700  justify-center items-center px-4 py-1 rounded-md'>
            <MdAdd></MdAdd>
            Add Expense
          </button>
        </div>
        <div>
          <div>
            <ViewGroupDailyExpense></ViewGroupDailyExpense>
            <GroupMonthlyExpenseGraph></GroupMonthlyExpenseGraph>
          </div>
          <div>
            <GroupMemberCard></GroupMemberCard>
          </div>
        </div>
        <div>
          <GroupRecentExpenses> </GroupRecentExpenses>
        </div>
      </div>
      {
        addMemberModal && (<AddMemberModal></AddMemberModal>)
      }
      {
        addExpenseModal && (<CreateExpenseModal></CreateExpenseModal>)
      }
    </div>
  )
}

export default AboutGroup