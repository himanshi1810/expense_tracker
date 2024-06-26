import React, { useEffect, useState } from 'react';
import { viewUser } from '../../Services/operations/authAPI'; 
import { MdAdd } from 'react-icons/md'; 
import { toast } from 'react-hot-toast';
import { makeSettlement } from '../../Services/operations/group'; 

function BalanceSheetCard({ data, token, groupId, onSettlement }) { 

  const [debtorName, setDebtorName] = useState('');
  const [creditorName, setCreditorName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const debtorResponse = await viewUser({ userId: data[0] });
        const creditorResponse = await viewUser({ userId: data[1] });

        if (debtorResponse.success && creditorResponse.success) {
          setDebtorName(`${debtorResponse.User.firstName} ${debtorResponse.User.lastName}`);
          setCreditorName(`${creditorResponse.User.firstName} ${creditorResponse.User.lastName}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [data]);

  const handleSettlement = async () => {
    try {
      const response = await makeSettlement({
        groupId: groupId,
        settleFrom: data[0],
        settleTo: data[1],
        settleAmount: data[2],
      }, token);

      if (response.success) {
        toast.success("Settlement made successfully");
        onSettlement(); 
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error making settlement");
      console.error("Error making settlement:", error);
    }
  };

  return (
    <div className='flex flex-col gap-2 px-7 pt-4 pb-5 border border-gray-400 rounded-md text-[14px] lg:flex-row'>
      <div className='text-[1rem] leading-[1.375rem] text-gray-400 flex-grow'>
        <p>
          {debtorName} owes {data[2]} rupees to {creditorName}
        </p>
      </div>
      <div className='flex justify-end'>
        <button 
          className='text-white flex gap-2 px-4 py-2 text-[14px] bg-blue-400 hover:bg-black-400 hover:border hover:border-gray-400 hover:scale-90 transition-all duration-700 justify-center items-center rounded-md'
          onClick={handleSettlement}
        >
          Make Settlement
          <MdAdd className='text-[18px]' />
        </button>
      </div>
    </div>
  );
}

export default BalanceSheetCard;
