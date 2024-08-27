import { CallCenterDashboardProps } from "./types";

function CallCenterDashboard({ minimized }: CallCenterDashboardProps) {
  return (
    <div
      className={`w-full ${
        minimized ? "lg:w-[90%]" : "lg:w-[80%]"
      } items-center h-screen mt-16 right-0 fixed transition-all duration-500 ease-in overflow-scroll`}
    >
      CallCenterDashboard
    </div>
  );
}

export default CallCenterDashboard;
