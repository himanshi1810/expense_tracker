import React from 'react'

function GroupCard({group}) {
  return (
    <div className='flex items-center gap-7 w-[100%] px-7 py-5 border border-gray-500 rounded-md'>
        <div>
            <img src={group.groupImage} className='w-[6rem] aspect-square rounded-full'></img>
        </div>
        <div className='flex flex-col w-[100%] gap-2 text-gray-400 text-[15px]'>
            <div className='flex justify-between text-[16px] text-white-100 font-semibold'>
                <p>{group.groupName}</p>
                <p>Group Expense : {group.groupTotal} ₹</p>
            </div>
            <div>
                <p>Descripton : {group.groupDescription}</p>
            </div>
            <div>
                <p>Group Owner : {group.groupOwner}</p>
            </div>
            <div>
                <p>Created At : {group.createdAt}</p>
            </div>
        </div>
    </div>
  )
}

export default GroupCard