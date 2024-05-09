import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { MdClose } from "react-icons/md";
import { useSelector } from 'react-redux';
import { addExpense } from '../../../../../Services/operations/expense';
import {toast} from 'react-toastify';

function CreateExpenseModal({setAddExpenseModal}) {
  const { token } = useSelector((state) => state.auth);
  const { group } = useSelector((state) => state.group);
  const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const { fields, append, remove } = useFieldArray({
        name: "expenseTo",
        control,
    });


    const submitHandler = async (data) => {
        const toastId = toast.loading('Loading...', { autoClose: false });
        const formData = new FormData();
        formData.append("expenseName", data.expenseName);
        formData.append("expenseDescription", data.expenseDescription);
        formData.append("expenseAmount", data.expenseAmount);
        formData.append("expenseType", data.expenseType);
    
        // Append expenseTo as an array
        formData.append("expenseTo", data.expenseTo);
    
        setLoading(true);
        console.log("BEFORE add Expense API call");
        console.log("PRINTING FORMDATA", formData);
        const result = await addExpense(formData, token, group._id);
        console.log("Printing  result :", result);
        if (!result) {
            toast.error("Error occurred while adding Expense");
        } else {
            // Dismiss the modal if the form submission is successful
            setAddExpenseModal(false);
        }
        setLoading(false);
        toast.dismiss(toastId);
    };
    
    return (
      <div className='fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
          <div className='bg-black-400 border border-gray-500 rounded-xl'>
              <div className='flex justify-between items-center bg-gray-600 px-4 py-2 rounded-t-xl text-[16px] text-white'>
                  <p>Add Expense</p>
                  <MdClose onClick={()=>(setAddExpenseModal(false))}/>
              </div>
              <div className='text-[14px] text-gray-400 px-6 py-5'>
                  <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-3'>
                  {/* name div */}
                      <div className='flex flex-col gap-2'>
                          <label htmlFor='expenseName'>Expense Name <sup className='text-pink-200'>*</sup></label>
                          <input
                                  id='expenseName'
                                  {...register("expenseName", {required:true})}
                                  placeholder='Light Bill paid'
                                  className='bg-black-400 border-[0.5px] focus:outline-none text-[14px] border-gray-500 px-3 py-2 rounded-md'></input>
                          {
                              errors.expenseName && (
                                  <span className='text-pink-200'>Expense Name is require**</span>
                              )
                          }        
                      </div>

                      {/* description div */}
                      <div className='flex flex-col gap-2'>
                          <label htmlFor='expenseDescription'>Expense Description <sup className='text-pink-200'>*</sup></label>
                          <textarea
                                  id='expenseDescription'
                                  {...register("expenseDescription", {required:true})}
                                  placeholder='Write your discription here'
                                  className='bg-black-400 border-[0.5px] focus:outline-none text-[14px] border-gray-500 px-3 py-2 rounded-md'></textarea>
                          {
                              errors.expenseDescription && (
                                  <span>Expense Descripton is require**</span>
                              )
                          }        
                      </div>

                      {/* amount and type div */}
                      <div className='flex flex-col gap-5 lg:flex-row'>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='expenseAmount'>Expense Amount <sup className='text-pink-200'>*</sup></label>
                            <input
                                    id='expenseAmount'
                                    {...register("expenseAmount", {required:true})}
                                    placeholder='2000'
                                    className='bg-black-400 border-[0.5px] focus:outline-none text-[14px] border-gray-500 px-3 py-2 rounded-md'></input>
                            {
                                errors.expenseAmount && (
                                    <span>Expense Amount is require**</span>
                                )
                            }        
                        </div>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='expenseType'>Expense Type <sup className='text-pink-200'>*</sup></label>
                            <input
                                    id='expenseType'
                                    {...register("expenseType", {required:true})}
                                    placeholder='Bill'
                                    className='bg-black-400 border-[0.5px] focus:outline-none text-[14px] border-gray-500 px-3 py-2 rounded-md'></input>
                            {
                                errors.expenseType && (
                                    <span>Expense Amount is require**</span>
                                )
                            }        
                        </div>
                      </div>
                      

                      <div className='flex flex-col gap-2'>
                          <label htmlFor='expenseTo'>Add Members (Add emailId)</label>
                          {
                              fields.map((member, index) => (
                                  <div key={member.id} className='flex gap-2 items-center'>
                                      <input type='email' placeholder="Add member's emailid" {...register(`expenseTo[${index}]`)}
                                      className='bg-black-400 w-[100%] border-[0.5px] focus:outline-none text-[14px] border-gray-500 px-3 py-2 rounded-md'/>
                                      {
                                          index>=0 && (
                                              <button onClick={(e)=>{
                                                  e.preventDefault();
                                                  remove(index)
                                              }}
                                              onKeyDown={(e) => {
                                                  if(e.key=='Enter'){
                                                      e.preventDefault();
                                                  }
                                              }}><MdClose></MdClose></button>
                                          )
                                      }
                                  
                                  </div>
                                  
                              ))
                          }
                          <button type='button' onClick={()=>append()} className='bg-gray-600 px-3 py-2 rounded-md text-white-100 w-max self-end'>Add</button>
                      </div>
                      <button type='submit' className='bg-blue-400 text-white-100 px-3 py-2 rounded-md self-center hover:bg-black-400 hover:border hover:shadow-md hover:border-gray-400 hover:scale-90 transition-all duration-500'>Create</button>

                  </form>
              </div>
          </div>
      </div>
    )
}

export default CreateExpenseModal
