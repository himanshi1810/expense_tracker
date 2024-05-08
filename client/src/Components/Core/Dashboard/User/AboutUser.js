import React from 'react'
import DailyUserExpenseGraph from './DailyUserExpenseGraph'
import MonthlyExpenseGraph from './MonthlyExpenseGraph'
import RecentExpenses from './RecentExpenses'

function AboutUser() {
  
  return (
    <div className='flex flex-col gap-6 text-gray-400'>
      <div className='text-[22px] font-semibold text-white-100'>My Expenses</div>
      <div className='flex flex-col gap-3'>
        <p className='text-white ext-[14px] font-semibold'>Expense Statisttics</p>
        <div className='flex gap-4 w-[100%]'>
          <div className='w-[100%] flex gap-3 flex-col px-3 py-3  bg-black-400 rounded-md border border-gray-300'>
            <p className='text-white'>Daily Expense</p>
            <DailyUserExpenseGraph></DailyUserExpenseGraph>
          </div>
          <div className='w-[100%] flex gap-3 flex-col px-3 py-3  bg-black-400 rounded-md border border-gray-300'>
            <p className='text-white'>Monthly Expense</p>
            <MonthlyExpenseGraph></MonthlyExpenseGraph>
          </div>
        </div>
      </div>
      <div >
        <p className='text-[22px] font-semibold text-white-100'>Recent expenses</p>
        <div>
          <RecentExpenses></RecentExpenses>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default AboutUser