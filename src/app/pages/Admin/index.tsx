import { useState } from "react";
import AdminNavigation from "./Navigation";
import { Navigate, Route, Routes } from "react-router-dom";
import Logs from "./LogList";
// import AdminDashboard from "./Dashboard";
import Register from "./Register";
import GuestRegister from "./GuestRegister/GuestRegister";
import GuestList from "./GuestRegister/GuesList";
import Groups from "./Groups";
import AdminProfile from "../CallCenter/Profile";
import GroupDetails from "./Groups/GroupDetails";

export default function Admin() {
  const [minimized, setMinimized] = useState(false);

  const handleMinimizeToggle = (
    minimizedState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setMinimized(minimizedState);
  };
  return (
    <div className="flex">
      <AdminNavigation onMinimizeToggle={handleMinimizeToggle} />

      <div className={``}>
        <Routes>
          <Route path="/" element={<Navigate to="registerMembers" />} />

          {/* <Route
            path="dashboard"
            element={<AdminDashboard minimized={minimized} />}
          /> */}

          <Route
            path="profile"
            element={<AdminProfile minimized={minimized} />}
          />

          <Route path="logs" element={<Logs minimized={minimized} />} />

          <Route
            path="/registerMembers"
            element={<Register minimized={minimized} />}
          />

          <Route
            path="/guestRegister"
            element={<GuestRegister  />}
          />

            <Route
            path="/guestList"
            element={<GuestList  />}
          />

          <Route path="/groups" element={<Groups minimized={minimized} />} />

          <Route
            path="/groups/:id"
            element={<GroupDetails minimized={minimized} />}
          />

          <Route path="/logs" element={<Logs minimized={minimized} />} />
        </Routes>
      </div>
    </div>
  );
}
