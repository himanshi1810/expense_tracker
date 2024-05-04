import { useSelector } from "react-redux";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ img, title, title2, description1, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-evenly gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 ">
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
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0 ml-12">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white-100 ">
              {title}
              <span className="text-[1.875rem] font-semibold leading-[2.375rem] text-blue-400">
                {title2}
              </span>
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-gray-400">{description1}</span>{" "}
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
