import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../../../Services/operations/authAPI"
import { setSignupData } from "../../../Reducer/Slices/authSlice"


function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
   
  }

  return (
    <div>
   
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4 mt-6">
          <label>
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-white-100">
              First Name <sup className="text-white-100">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-style w-full   bg-gray-400 text-white-100 py-2 rounded-lg px-2"
            />
          </label>
          <label>
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-white">
              Last Name <sup className="text-white">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-style w-full   bg-gray-400 text-white-100 py-2 rounded-lg px-2"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[1rem] leading-[1.375rem] text-white">
            Email Address <sup className="text-white">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full   bg-gray-400 text-white-100 py-2 rounded-lg px-2"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-white">
              Create Password <sup className="text-white">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full  bg-gray-400 text-white-100 py-2 rounded-lg px-2 !pr-10"
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
          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-white">
              Confirm Password <sup className="text-white">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="fform-style w-full !pr-10   bg-gray-400 text-white-100 py-2 rounded-lg px-2"
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
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-blue-400 py-[8px] px-[12px] font-bold text-white-100"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
