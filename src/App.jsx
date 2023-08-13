import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Menu } from "./ContextAPI/ContextAPI";
import { useState } from "react";

import { Toaster } from "react-hot-toast";

const App = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [drawerToggle, setDrawerToggle] = useState(false);

  return (
    <Menu.Provider value={{ navToggle, setNavToggle, drawerToggle, setDrawerToggle }}>
      <div className="overflow-x-hidden lg:overflow-x-visible relative ">
        <Navbar />
        <div onClick={() => {
          navToggle & setNavToggle(false);
        }}>

          <Outlet />
          <Toaster />
        </div>
        <Footer />

      </div>
    </Menu.Provider>
  );
};

export default App;