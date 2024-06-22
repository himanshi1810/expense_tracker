import React from 'react'
import ExpenseCard from '../../../Common/ExpenseCard'

function GroupRecentExpenses({recentExpenses}) {
  return (
    <div>
      <div className='flex flex-col gap-5'>
        {
          recentExpenses.map((expense, index) => (
            <ExpenseCard expense={expense} key={index}></ExpenseCard>
          ))
        }
      </div>
    </div>
  )
}

export default GroupRecentExpenses