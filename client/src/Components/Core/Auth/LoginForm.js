import { useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Services/operations/authAPI";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    };

    return (
        <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-full flex-col gap-y-4"
        >
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
                    className="form-style w-full bg-grey-100 text-white py-2 rounded-lg px-2"
                />
            </label>
            <label className="relative">
                <p className="mb-1 text-[1rem] leading-[1.375rem] text-white">
                    Password <sup className="text-white">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="form-style w-full !pr-10  bg-grey-100 text-white py-2 rounded-lg px-2"
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible   fontSize={24} fill="#0b0d10" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#0b0d10" />
                    )}
                </span>
                <Link to="/forgotPassword">
                    <p className="mt-1 ml-auto max-w-max text-xs text-grey-100">
                        Forgot Password ?
                    </p>
                </Link>
            </label>
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-primary py-[8px] px-[12px] font-medium text-white "
            >
                Login To Your Account
            </button>
        </form>
    );
}

export default LoginForm;
