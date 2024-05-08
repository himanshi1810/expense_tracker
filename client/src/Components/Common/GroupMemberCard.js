import React from 'react'

function GroupMemberCard({member}) {
  return (
    <div className='flex gap-5 text-[15px] text-gray-400'>
      <div>
        <img src={member.profileImage} className='w-[3rem] aspect-square rounded-full'></img>
      </div>
      <div>
        <div className='flex gap-1'>
          {
            <p>{member.firstName}</p>
          }
          {
            <p>{member.lastName}</p>
          }
        </div>
        <div>
          {
            member.email
          }
        </div>
      </div>
    </div>
  )
}

export default GroupMemberCard