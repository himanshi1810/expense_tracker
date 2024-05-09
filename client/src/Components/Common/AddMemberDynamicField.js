import React from 'react'
import { useFieldArray } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import {useForm} from "react-hook-form"
function AddMemberDynamicField({
    name,
    label,
    register,
    control,
    setValue,
    errors,}) {
    const {fields, append, remove} = useFieldArray({
        name : "groupMembers",
        control
    })
  return (
    <div className='flex flex-col gap-2'>
    <label htmlFor='groupMembers'>{label}</label>
    {
        fields.map((member, index) => (
            <div key={member.id} className='flex gap-2 items-center'>
                <input type='email' placeholder="Add member's emailid" {...register(`${name}[${index}]`)}
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
  )
}

export default AddMemberDynamicField