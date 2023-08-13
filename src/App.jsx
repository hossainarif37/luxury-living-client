import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Menu } from "./ContextAPI/ContextAPI";
import { useState } from "react";
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
import { Toaster } from "react-hot-toast";

const App = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [drawerToggle, setDrawerToggle] = useState(false);
  const navigate = useNavigate();
  const handleAchorLink = async (e, hashroute) => {
    e.preventDefault();
    await navigate('/');
    window.location.hash = hashroute;
  }

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
        <a href='' onClick={(e) => handleAchorLink(e, 'banner')} className="text-4xl fixed bottom-5 right-3">
          <BsFillArrowUpSquareFill />
        </a>
      </div>
    </Menu.Provider>
  );
};

export default App;