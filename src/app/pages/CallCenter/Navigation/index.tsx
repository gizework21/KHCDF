import { CiUser } from "react-icons/ci";
import { CallCenterNavigationProps } from "./types";
// import { HiHome } from "react-icons/hi";
import { TbClipboardList } from "react-icons/tb";
import NavBar from "../../../components/NavBar";

function CallCenterNavigation({ onMinimizeToggle }: CallCenterNavigationProps) {
  const items = [
    // {
    //   icon: <HiHome size={24} />,
    //   text: "DashBoard",
    //   link: "/callCenter/dashboard",
    // },

    {
      icon: <CiUser size={24} />,
      text: "Register",
      link: "/callCenter/registerMembers",
    },

    {
      icon: <TbClipboardList size={24} />,
      text: "Logs",
      link: "/callCenter/logs",
    },
  ];

  return <NavBar items={items} onMinimizeToggle={onMinimizeToggle} />;
}

export default CallCenterNavigation;
