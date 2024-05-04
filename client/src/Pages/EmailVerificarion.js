import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../Services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import img from "../assets/Logo.png"

function EmailVerificarion() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
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
            <h1 className="text-white-100 font-semibold text-[1.875rem] leading-[2.375rem]">
              Verify Email
            </h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-gray-400">
              A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={handleVerifyAndSignup}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-gray-400 rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
              <button
                type="submit"
                className="w-full bg-blue-400 py-[12px] px-[12px] rounded-[8px] mt-6 font-bold text-white-100"
              >
                Verify Email
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/signup">
                <p className="text-gray-400 flex items-center gap-x-2">
                  <BiArrowBack /> Back To Signup
                </p>
              </Link>
              <button
                className="flex items-center text-gray-400 gap-x-2"
                onClick={() => dispatch(sendOtp(signupData.email))}
              >
                <RxCountdownTimer />
                Resend it
              </button>
            </div>
          </div>
        </div>
        
      )}
    </div>
  );
}



export default EmailVerificarion