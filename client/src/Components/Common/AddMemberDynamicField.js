import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { MdClose } from 'react-icons/md';

function AddMemberDynamicField({
  name,
  label,
  register,
  control,
  defaultValue = [],
  errors,
}) {
  const { fields, append, remove, replace } = useFieldArray({
    name: 'groupMembers',
    control,
  });

  // Convert defaultValue to array of objects if necessary
  const formattedDefaultValue = defaultValue.map(email => (email));

  //console.log("Default values : ", formattedDefaultValue);

  useEffect(() => {
    if (formattedDefaultValue.length > 0) {
      replace(formattedDefaultValue); // Replace the entire field array with the default values
    }
  }, []); // Ensure effect runs only once when the component mounts

  //console.log("Field values : ", fields);

  // Function to clear the field array
  const clearAll = () => {
    replace([]); // Clear all fields by replacing with an empty array
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='groupMembers' className='text-white'>{label}</label>
      {fields.map((member, index) => (
        <div key={member.id} className='flex gap-2 text-gray-400 items-center'>
          <input
            type='email'
            placeholder="Add member's email"
            {...register(`${name}[${index}].email`)}
            onKeyDown={(e) => {
              if(e.key == 'Enter'){
                e.preventDefault();
              }
            }}
            defaultValue={member.email}
            className='bg-black-400 w-[100%] border-[0.5px] focus:outline-none text-[14px] border-gray-500 px-3 py-2 rounded-md'
          />
          {index >= 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                remove(index);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            >
              <MdClose />
            </button>
          )}
        </div>
      ))}
      <div className='flex gap-3 self-end'>
        <button
          type='button'
          onClick={() => append({ email: '' })} // Ensure append adds an object with an email property
          className='bg-gray-600 px-3 py-1 text-[14px] rounded-md text-white-100 w-max self-end'
        >
          Add
        </button>
        <button
          type='button'
          onClick={clearAll} // Clear all fields
          className='bg-red-600 px-3 py-1 rounded-md text-[14px] text-white-100 w-max self-end mt-2'
        >
          Clear All
        </button>
      </div>
      {errors.groupMembers && (
        <p className='text-[13px] text-pink-400'>Enter correct email id</p>
      )}
    </div>
  );
}

export default AddMemberDynamicField;
