import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../Services/operations/settingsAPI"
import IconBtn from "../../../Common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-500 p-4 md:p-8 md:px-12">
          <h2 className="text-lg font-semibold text-white-100">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">

              <label htmlFor="oldPassword" className="mb-1 text-[0.88rem] leading-[1rem] text-white-100">
                Old Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                className="form-style w-full border border-gray-400 text-[14px] bg-black-400 text-white-100 py-2 rounded-lg px-2"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 bottom-3 z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} className="text-white-100" />
                ) : (
                  <AiOutlineEye fontSize={20} className="text-white-100" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-pink-200">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="mb-1 text-[0.89rem] leading-[1] text-white-100">
               New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                className="form-style w-full border border-gray-400 text-[14px] bg-black-400 text-white-100 py-2 rounded-lg px-2"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 bottom-3 z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} className="text-white-100" />
                ) : (
                  <AiOutlineEye fontSize={20} className="text-white-100" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end text-[15px] gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/aboutUser")
            }}
            className="cursor-pointer rounded-md bg-blue-400 py-2 px-5 font-semibold text-white-100"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  )
}
