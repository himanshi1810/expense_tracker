import React from 'react'
import { formatDate } from '../../Utils/DateFormatter'

function GroupCard({group}) {
    const groupOwner = group.groupMembers.filter((member)=>member._id===group.groupOwner)
    const date = formatDate(group.createdAt)
  return (
    <div className='flex items-center gap-7 flex-col md:flex-row mr-3 md:w-[100%] px-7 py-5 border border-gray-500 rounded-md'>
        <div>
            <img src={group.groupImage} className='w-[6rem] aspect-square rounded-full'></img>
        </div>
        <div className='flex flex-col w-[100%] gap-2 text-gray-400 text-[15px]'>
            <div className='flex flex-col md:flex-row justify-between text-[16px] text-white-100 font-semibold'>
                <p>{group.groupName}</p>
                <p>Group Expense : {group.groupTotal} ₹</p>
            </div>
            <div className='flex flex-wrap'>
                <p>Descripton : <span>{group.groupDescription}</span></p>
            </div>
            <div className='flex flex-wrap'>
                <p>Group Owner : <span className=''>{groupOwner[0].firstName} {groupOwner[0].lastName}</span></p>
            </div>
            <div className='flex flex-wrap'>
                <p>Created At : <span> {date}</span></p>
            </div>
        </div>
    </div>
  )
}

export default GroupCard