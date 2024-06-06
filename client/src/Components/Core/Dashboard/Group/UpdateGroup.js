import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateGroup } from "../../../../Services/operations/group";
import IconBtn from "../../../Common/IconBtn";
import DeleteGroup from "./DeleteGroup";
import ViewGroupMember from "./ViewGroupMember";
import UpdateGroupImage from "./UpdateGroupImage";
import { useParams } from "react-router-dom";

export default function UpdateGroup() {

  const { group } = useSelector((state) => state.group);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  
  console.log(id)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitGroupForm = async (data) => { 
    console.log("Form Data - ", data)

    try {
      console.log(id)
      dispatch(updateGroup(token,data,id)); 
      
    } catch (error) {
      console.log('ERROR MESSAGE - ', error.message);

    }
  };

  return (
    <>
    {/* group Image */}
      <UpdateGroupImage/>
    {/* Update Group */}
      <form onSubmit={handleSubmit(submitGroupForm)}>
        {/* Group Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-500 p-8 px-12">
          <h2 className="text-lg font-semibold text-white-100">Basic Details</h2>
       
            <div className="flex flex-col gap-2 ">
              <label>
                <p className="mb-1 text-[1rem] leading-[1.375rem] text-white-100">
                  Group Name <sup className="text-white-100">*</sup>
                </p>
                <input
                  type="text"
                  name="groupName"
                  id="groupName"
                  placeholder="Enter group name"
                  className="form-style w-full bg-gray-400 text-white-100 py-2 rounded-lg px-2"
                  {...register("groupName", { required: true })}
                  defaultValue={group?.groupName}
                />
              </label>
              {errors.groupName && (
                <span className="-mt-1 text-[12px] text-white-100">Please enter group name.</span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <label>
                <p className="mb-1 text-[1rem] leading-[1.375rem] text-white-100">
                  Group Description <sup className="text-white-100">*</sup>
                </p>
                <textarea
                  id='groupDescription'
                  {...register("groupDescription", { required: true })}
                  placeholder='Write your description here'
                  className='form-style w-full bg-gray-400 text-white-100 py-2 rounded-lg px-2'
                  defaultValue={group?.groupDescription}
                />

              </label>
              {errors.groupDescription && (
                <span className="-mt-1 text-[12px] text-white-100">Please enter group description.</span>
              )}
            </div>
        
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/group");
            }}
            className="cursor-pointer rounded-md bg-blue-400 py-2 px-5 font-semibold text-white-100"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      
      </form>
      
      {/* Viewing additional info */}
      <ViewGroupMember/>
      {/* Delete The Group */}
      <DeleteGroup/>

    </>
  );
}
