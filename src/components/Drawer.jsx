import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "../ContextAPI/ContextAPI";

const Drawer = ({ menuItems }) => {
    const { drawerToggle, setDrawerToggle } = useContext(Menu);

    return (
        <div className="flex">
            {/* -----Desktop Version Start ------ */}
            {/* Sidebar */}
            <ul className="hidden lg:block h-screen lg:w-3/12 pl-16 pt-5 space-y-5 ">
                {menuItems}
            </ul>


            {/* -------Mobile Version Start------*/}
            {/* Menu */}
            <div className="relative lg:hidden">
                <ul className={`menu absolute duration-500 top-0 pl-3 ${drawerToggle ? 'left-0 ' : 'left-[-250px]'}`}>
                    {menuItems}
                </ul>
            </div>
            {/* -------Mobile Version End------*/}

            {/* Page Content */}
            <div onClick={() => setDrawerToggle(false)} className="bg-slate-50 lg:pt-3 pb-10 lg:px-5 w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Drawer;