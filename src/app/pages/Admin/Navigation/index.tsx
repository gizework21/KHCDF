import { CiUser } from "react-icons/ci";
import { AdminNavigationProps } from "./types";
// import { HiHome } from "react-icons/hi";
import { TbClipboardList } from "react-icons/tb";
import NavBar from "../../../components/NavBar";
import { MdGroups } from "react-icons/md";

function AdminNavigation({ onMinimizeToggle }: AdminNavigationProps) {
  const items = [
    // {
    //   icon: <HiHome size={24} />,
    //   text: "DashBoard",
    //   link: "/admin/dashboard",
    // },

    {
      icon: <CiUser size={24} />,
      text: "Register",
      link: "/admin/registerMembers",
    },

    {
      icon: <CiUser size={24} />,
      text: "Guest Register",
      link: "/admin/guestRegister",
    },

    {
      icon: <CiUser size={24} />,
      text: "Guest List",
      link: "/admin/guestList",
    },

    {
      icon: <MdGroups size={24} />,
      text: "Groups",
      link: "/admin/groups",
    },

    {
      icon: <TbClipboardList size={24} />,
      text: "Logs",
      link: "/admin/logs",
    },
  ];

  return <NavBar items={items} onMinimizeToggle={onMinimizeToggle} />;
}

export default AdminNavigation;
