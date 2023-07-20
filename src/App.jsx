import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Menu } from "./ContextAPI/ContextAPI";
import { useState } from "react";

const App = () => {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  return (
    <Menu.Provider value={{ dashboardToggle, setDashboardToggle, navToggle, setNavToggle }}>
      <div className="max-w-[1440px] mx-auto overflow-x-hidden">
        <Navbar />
        <div onClick={() => {
          navToggle & setNavToggle(false);
        }}>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </Menu.Provider>
  );
};

export default App;