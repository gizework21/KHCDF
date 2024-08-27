/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "../Button";
import { IRegisterMember } from "../../api/types";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { selectUpdatePasswordLoading, updatePasswordThunk } from "./slice";
import { setUser } from "../../api/slice";
import { CgSpinner } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../../../assets/img/profile.png";
import { IUser } from "../../pages/Shared/Home/slice/types";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/constants";

const UserProfile = ({ user }: { user: IUser | null }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectUpdatePasswordLoading);
  const userInfo = getUserInfo();
  const role = userInfo ? userInfo.user.role : null;
  const id = userInfo ? userInfo.user._id : null;

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordsMatchError(true);
      return;
    }

    dispatch<any>(updatePasswordThunk(currentPassword, newPassword, id))
      .then(() => {
        // Update user data in the Redux store after successful password update
        const updatedUser: IRegisterMember = {
          ...user!,
        };
        dispatch<any>(setUser(updatedUser));

        toast.success("Password Updated Successfully!");

        setTimeout(() => {
          navigate(`/${role}/dashboard`);
        }, 3000);
      })
      .catch((error: any) => {
        console.error("Password update failed:", error);
        toast.error(error);
      });

    // Clear form fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordsMatchError(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[25rem]">
        <ImSpinner2 className="animate-spin text-[#00875F]" size={100} />
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        position="bottom-right"
      />

      <div className="flex md:flex-row flex-col justify-evenly sm:items-center mt-16 mx-4 sm:mx-14 gap-10">
        <div className="gap-5 flex flex-col px-10 py-5 bg-[#EFEFEF] rounded-xl md:w-1/2">
          <div className="flex items-center justify-center w-full">
            <img src={Profile} alt="" className="w-[70%]" />
          </div>
          <div className="text-xl">
            <p>
              <strong>Name:</strong> {user?.fullName}
            </p>
          </div>

          <div className="text-xl">
            <p>
              <strong>Email:</strong>
              {/* {user?.email} */}
            </p>
          </div>

          <div className="text-xl">
            <p>
              <strong>Phone Number:</strong> {user?.phoneNumber}
            </p>
          </div>

          <div className="text-xl capitalize">
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>
        </div>

        <div className="flex flex-col px-5 mb-20 md:mb-0 h-full md:px-5 py-5 bg-[#EFEFEF] rounded-xl md:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xl">
            <div className="flex justify-center font-bold">
              <h3>Update Password</h3>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between">
              <label htmlFor="currentPassword">Current Password:</label>
              <div className="relative text-black">
                <input
                  type={showPassword ? "text" : "password"}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="border border-black rounded-sm outline-none text-sm px-3 h-8 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-0.5 rounded-sm transform -translate-y-[50%] focus:outline-none hover:bg-slate-300 p-1"
                >
                  {showPassword ? (
                    <IoMdEyeOff size={15} />
                  ) : (
                    <IoMdEye size={15} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between">
              <label htmlFor="newPassword">New Password:</label>
              <div className="relative text-black">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-black rounded-sm outline-none text-sm px-3 h-8 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-0.5 rounded-sm transform -translate-y-[50%] focus:outline-none hover:bg-slate-300 p-1"
                >
                  {showPassword ? (
                    <IoMdEyeOff size={15} />
                  ) : (
                    <IoMdEye size={15} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="relative text-black">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-black rounded-sm outline-none text-sm px-3 h-8 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-0.5 rounded-sm transform -translate-y-[50%] focus:outline-none hover:bg-slate-300 p-1"
                >
                  {showPassword ? (
                    <IoMdEyeOff size={15} />
                  ) : (
                    <IoMdEye size={15} />
                  )}
                </button>
              </div>
            </div>

            {passwordsMatchError && (
              <div className="text-base text-end text-red-600 font-semibold">
                <p>Passwords do not match!</p>
              </div>
            )}

            <div className="flex justify-center text-base">
              <Button type="submit">
                {isLoading ? (
                  <CgSpinner size={28} className="animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
