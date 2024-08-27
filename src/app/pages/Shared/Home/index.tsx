/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Family from "../../../../assets/img/Family.svg";
import avatar from "../../../../assets/img/avatar.svg";
import { FaLock } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";
import { MdPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginThunk } from "./slice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "../../../utils/constants";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userInfo = getUserInfo();
  const Role = userInfo ? userInfo.user.role : null;

  // Password Show & Hide
  const togglePassword = () => setShowPassword(!showPassword);

  // UseEffect to navigate after login
  useEffect(() => {
    if (userInfo) {
      navigate(`/${Role}`);
    }
  }, [Role, navigate, userInfo]);

  // Login Function
  const handleLogin = async () => {
    setLoading(true);

    try {
      await dispatch<any>(userLoginThunk({ phoneNumber, password }));

      // Show success toast
      toast.success("Login successful!");

      setLoading(false);
    } catch (error) {
      console.error("Error logging in:", error);

      // Show error toast
      toast.error("Invalid Credentials!");

      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar position="top-center" />

      <div className="flex justify-center items-center bg-[#DEB889] h-screen transition-all duration-500 ease-in">
        <div className="flex justify-center flex-col xl:flex-row">
          <div className="md:flex justify-center items-center hidden rounded-full overflow-hidden">
            <img
              src={Family}
              alt="background"
              className="w-40 md:w-44 xl:w-96"
            />
          </div>
        </div>

        <div className="flex justify-center items-center text-center w-full xl:p-10 xl:w-1/2">
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col pb-5">
              <img src={avatar} alt="avatar" className="h-20 mx-auto" />

              <h2 className="text-slate-950 text-3xl">
                Welcome To{" "}
                <strong className="text-slate-950 tracking-wider">ትብብር</strong>
              </h2>
            </div>

            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-full flex items-center justify-center gap-5 relative">
                <input
                  type="text"
                  className="w-[80%] md:pr-10 pl-10 md:pl-12 py-3 rounded border border-gray-300 outline-none focus:border-primary"
                  placeholder="Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div className="absolute left-[12%] text-primary top-1/2 transform -translate-y-1/2">
                  <MdPhone size={20} />
                </div>
              </div>

              <div className="w-full flex items-center justify-center gap-5 relative">
                <div className="absolute left-[12%] text-slate-950 top-1/2 transform -translate-y-1/2">
                  <FaLock />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  className="w-[80%] md:pr-10 pl-10 md:pl-12 py-3 rounded border border-gray-300 outline-none"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div
                  className="absolute right-[12%] text-primary top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>

              <div className="w-[80%] flex items-end justify-end text-md font-semibold mb-6 text-end">
                <p className="text-slate-950 w-1/3 text-end cursor-pointer hover:underline">
                  Forget Password
                </p>
              </div>

              <button
                onClick={handleLogin}
                className="w-[80%] py-3 rounded-full text-white font-semibold tracking-wide text-lg bg-slate-950 hover:opacity-80 cursor-pointer flex justify-center"
              >
                {loading ? (
                  <CgSpinner size={28} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
