// import { useSelector } from "react-redux";
import { CallCenterDashboardProps } from "../Dashboard/types";

import UserProfile from "../../../components/Profile";
// import { selectUser } from "../../../api/slice/selectors";
import { getUserInfo } from "../../../utils/constants";

export default function AdminProfile({ minimized }: CallCenterDashboardProps) {
  //   const user = useSelector(selectUser);

  const userInfo = getUserInfo();
  const user = userInfo ? userInfo.user : null;

  return (
    <div
      className={`w-full bg-lightGreen ${
        minimized ? "lg:w-[90%]" : "lg:w-[80%]"
      } items-center h-screen mt-16 right-0 fixed overflow-scroll transition-all duration-500 ease-in`}
    >
      <UserProfile user={user} />
    </div>
  );
}
