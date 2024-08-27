import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Home from "./pages/Shared/Home";
import { useEffect, useState } from "react";
import { getUserInfo } from "./utils/constants";
import { NotFound } from "./components/NotFound";
import CallCenter from "./pages/CallCenter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeRoute = () => {
    return location.pathname === "/";
  };

  const userInfo = getUserInfo();
  const Role = userInfo ? userInfo.user.role : null;

  const handleLogout = () => {
    setIsLoggedIn(false);

    localStorage.removeItem("userInfo");

    navigate("/");
  };

  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);

      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex flex-col">
      {!isHomeRoute() && isLoggedIn && <Header onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Home />} />

        {isLoggedIn && (
          <>
            {Role === "admin" && <Route path="/admin/*" element={<Admin />} />}

            {Role === "callCenter" && (
              <Route path="/callCenter/*" element={<CallCenter />} />
            )}

            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
