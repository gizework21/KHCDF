import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HeaderProps } from "./types";
import { getUserInfo } from "../../utils/constants";

function Header({ onLogout }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userInfo = getUserInfo();
  const Role = userInfo ? userInfo.user.role : null;
  const fullName = userInfo ? userInfo.user.fullName : null;
  const firstName = fullName ? fullName.split(" ")[0] : "";

  return (
    <div className="bg-[#EFEFEF] h-16 w-full flex justify-end items-center gap-3 pr-10 fixed top-0 z-40">
      <div
        className="flex capitalize items-center gap-3 hover:bg-slate-950 hover:text-white cursor-pointer p-2 rounded-md relative"
        onMouseEnter={() => setIsProfileOpen(true)}
        onMouseLeave={() => setIsProfileOpen(false)}
      >
        <FaUser />

        <h2>
          {firstName} - {Role}
        </h2>
      </div>

      {isProfileOpen && (
        <div
          className={`absolute top-12 right-0 p-3 rounded-md shadow-2xl w-60 border-x border-b border-slate-950 backdrop-blur`}
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <div className="flex justify-center gap-5 pt-5 w-full z-50">
            <Link
              to={`${Role}/profile`}
              className={`flex justify-start items-center cursor-pointer text-sm gap-4 w-1/2 p-2 rounded-md font-semibold bg-white hover:bg-slate-950 border border-slate-950 hover:border-white hover:text-white`}
            >
              <FiUser size={18} />
              Profile
            </Link>

            <div
              className={`flex justify-start items-center cursor-pointer text-sm gap-4 w-1/2 p-2 rounded-md font-semibold bg-white hover:bg-slate-950 border border-slate-950 hover:border-white hover:text-white`}
              onClick={onLogout}
            >
              <IoLogOutOutline size={18} />
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
