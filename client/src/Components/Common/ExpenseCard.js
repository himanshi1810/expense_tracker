import React from 'react'
import { formatDate } from '../../Utils/DateFormatter'

function ExpenseCard({expense}) {
    const date = formatDate(expense?.createdAt)
  return (
    <div className='flex flex-col gap-2 px-7 pt-4 pb-5 border border-gray-400 rounded-md text-[14px]'>
        <div className='flex justify-between text-[17px] font-semibold text-white'>
            <p>{expense?.expenseName}</p>
            <p>{expense?.expensePerMember}₹</p>
        </div>
        <div>
            <p> Group Name : <spin>{expense?.groupId?.groupName}</spin></p>
        </div>
        <div>
            <p>  Date : <spin>{date}</spin></p>
        </div>
        <div>
            <p>  About : <spin>{expense?.expenseDescription}</spin></p>
        </div>
        <div className='flex justify-between'>
            <p>  Expense Currency : <spin>{expense?.expenseCurrency}</spin></p>
            <p>  Expense Type : <spin>{expense?.expenseType}</spin></p>
        </div>
    </div>
  )
}

export default ExpenseCard