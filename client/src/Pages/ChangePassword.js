import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import img from "../assets/Logo.png"
import { resetPassword } from "../Services/operations/authAPI"

function ChangePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-evenly gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 ">
            <img
              src={img} 
              alt="logo"
              width={700}
              height={700}
              loading="lazy"
              className=""
            />
          </div>
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
              Choose new password
            </h1>
            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-gray-400">
              Almost done. Enter your new password and youre all set.
            </p>
            <form onSubmit={handleOnSubmit}>
              <label className="relative">
                <p className="mb-1 text-[1rem] leading-[1.375rem] text-white-100">
                  New Password <sup className="text-white-100">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="form-style w-full bg-gray-100 text-white-100 py-2 rounded-lg px-2 !pr-10"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#0b0d10" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#0b0d10" />
                  )}
                </span>
              </label>
              <label className="relative mt-3 block">
                <p className="mb-1 text-[1rem] leading-[1.375rem] text-white-100">
                  Confirm New Password <sup className="text-white-100">*</sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="form-style w-full  bg-gray-100 text-white-100 py-2 rounded-lg px-2 !pr-10"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#0b0d10" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#0b0d10" />
                  )}
                </span>
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-[8px] bg-blue-400 py-[12px] px-[12px] font-bold text-white-100 hover:bg-black-400 hover:border-[1px] hover:border-gray-400 transition-all duration-500"
              >
                Reset Password
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/login">
                <p className="flex items-center gap-x-2 text-grey-100">
                  <BiArrowBack /> Back To Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChangePassword