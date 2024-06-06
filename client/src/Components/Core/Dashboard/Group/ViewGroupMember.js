import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { viewGroup } from '../../../../Services/operations/group';


function ViewGroupMember() {
  
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  let { id } = useParams();
  

  const fetchData = async () => {
    setLoading(true);
    try {
      
      const result = await viewGroup({groupId : id});
      if (result) {
        setGroupData(result.group); 
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);
 

  return (
    <div className="my-10">
      {groupData ? (
        <div className="flex flex-col gap-y-6 rounded-md border-[1px] border-gray-500 p-8 px-12">
        <h2 className="text-lg font-semibold text-white-100">Group Details</h2>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label>
              <p className="mb-1 text-[1rem] leading-[1.375rem] text-white-100">
                Group Name
              </p>
              <p className="w-full bg-gray-400 text-white-100 py-2 rounded-lg px-2">{groupData.groupName}</p>
            </label>
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label>
              <p className="mb-1 text-[1rem] leading-[1.375rem] text-white-100">
                Created At
              </p>
              <p className="w-full bg-gray-400 text-white-100 py-2 rounded-lg px-2"> {new Date(groupData.createdAt).toLocaleString()}</p>
            </label>
          </div>
        </div>
 
        <div className="">
        <p className="mb-1 text-[1rem] leading-[1.375rem] text-white-100">
             Group Members
        </p>
          <ul >
            {groupData.groupMembers.map((member) => (
              <li key={member._id} className="w-full bg-gray-400 text-white-100 py-2 rounded-lg px-2 mt-3">
                {member.firstName} {member.lastName} 
              </li>
            ))}
          </ul>
        </div>
      </div>
      ) : (
        <p className="text-white-100">Loading group data...</p>
      )}
    </div>
  );
}

export default ViewGroupMember;
