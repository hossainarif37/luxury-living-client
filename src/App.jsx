import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Menu } from "./ContextAPI/ContextAPI";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [navToggle, setNavToggle] = useState(false);
  // const [dashboardToggle, setDashboardToggle] = useState(false);
  // const [adminToggle, setAdminToggle] = useState(false);
  const [drawerToggle, setDrawerToggle] = useState(false);
  return (
    <Menu.Provider value={{ navToggle, setNavToggle, drawerToggle, setDrawerToggle }}>
      <div className="max-w-[1440px] mx-auto overflow-x-hidden lg:overflow-x-visible">
        <Navbar />
        <div onClick={() => {
          navToggle & setNavToggle(false);
        }}>
          <Outlet />
          <Toaster />
        </div>
        {/* <Footer /> */}
      </div>
    </Menu.Provider>
  );
};

export default App;