import React from 'react'

function Modal({modalData}) {
  return (
    <div className='fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='flex flex-col bg-black-400 rounded-md gap-2 border border-gray-200 px-8 py-4'>
            <p className='text-gray-400 text-[17px] font-semibold'>{modalData.title}</p>
            <p className='text-gray-400 text-[14px]'>{modalData.description}</p>
            <div className='flex gap-3 self-center py-2'>
                <button onClick={modalData.button1Handler} className='px-4 py-1 rounded-md text-center text-white text-[14px] bg-blue-400 cursor-pointer'>{modalData.button1Text}</button>
                <button onClick={modalData.button2Handler} className='px-3 py-1 rounded-md text-center text-white text-[14px] bg-gray-400 cursor-pointer'>{modalData.button2Text}</button>
            </div>
        </div>
    </div>
  )
}

export default Modal