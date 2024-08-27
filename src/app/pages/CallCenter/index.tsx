import { useState } from "react";
import CallCenterNavigation from "./Navigation";
import { Navigate, Route, Routes } from "react-router-dom";
import Logs from "./LogList";
// import CallCenterDashboard from "./Dashboard";
import Register from "./Register";
import CallCenterProfile from "./Profile";

export default function CallCenter() {
  const [minimized, setMinimized] = useState(false);

  const handleMinimizeToggle = (
    minimizedState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setMinimized(minimizedState);
  };
  return (
    <div className="flex">
      <CallCenterNavigation onMinimizeToggle={handleMinimizeToggle} />

      <div className={``}>
        <Routes>
          <Route path="/" element={<Navigate to="registerMembers" />} />

          {/* <Route
            path="dashboard"
            element={<CallCenterDashboard minimized={minimized} />}
          /> */}

          <Route
            path="profile"
            element={<CallCenterProfile minimized={minimized} />}
          />

          <Route path="logs" element={<Logs minimized={minimized} />} />

          <Route
            path="/registerMembers"
            element={<Register minimized={minimized} />}
          />

          <Route path="/logs" element={<Logs minimized={minimized} />} />
        </Routes>
      </div>
    </div>
  );
}
