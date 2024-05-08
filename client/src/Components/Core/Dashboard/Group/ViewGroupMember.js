import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { viewGroup } from '../../../../Services/operations/group';

function ViewGroupMember() {
  const [groupData, setGroupData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { group } = useSelector((state) => state.group);

  useEffect(() => {
    async function fetchGroupData() {
      try {
        const data = { groupId: group._id }; 
        const result = await viewGroup(data, token);
        setGroupData(result.group);
      } catch (error) {
        console.error('Error fetching group data:', error);
        
      }
    }

    fetchGroupData();
  }, [token]);

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
