import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getPasswordResetToken } from "../Services/operations/authAPI"
import img from "../assets/Logo.png"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-evenly gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={img} 
              alt="logo"
              width={700}
              height={700}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
              {!emailSent ? "Reset your password" : "Check email"}
            </h1>
            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-grey-100">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : `We have sent the reset email to ${email}`}
            </p>
            <form onSubmit={handleOnSubmit}>
              {!emailSent && (
                <label className="w-full">
                  <p className="mb-1 text-[1rem] leading-[1.375rem] text-white">
                    Email Address <sup className="text-white">*</sup>
                  </p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="form-style w-full bg-grey-100 text-white py-2 rounded-lg px-2"
                  />
                </label>
              )}
              <button
                type="submit"
                className="mt-6 w-full rounded-[8px] bg-primary py-[12px] px-[12px] font-bold text-white"
              >
                {!emailSent ? "Sumbit" : "Resend Email"}
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

export default ForgotPassword