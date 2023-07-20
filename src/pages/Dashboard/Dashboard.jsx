import { Link, Outlet } from "react-router-dom";
import cart from "../../assets/Icon/cart.png"
import order_list from "../../assets/Icon/order_list.png"
import review from "../../assets/Icon/review.png"
import { useContext } from "react";
import { Menu } from "../../ContextAPI/ContextAPI";

const Dashboard = () => {
    const { dashboardToggle, setDashboardToggle } = useContext(Menu);
    const dashboardMenu = <>
        <li><Link className="flex gap-3 items-center" to='cart'><img className="w-6" src={cart} alt="" />Cart</Link></li>
        <li><Link className="flex gap-3 items-center" to='order-list'><img className="w-6" src={order_list} alt="" />Order List</Link></li>
        <li><Link className="flex gap-3 items-center" to='review'><img className="w-6" src={review} alt="" />Review</Link></li>
    </>
    return (
        <div className="flex">
            {/* -----Desktop Sidebar------ */}
            <ul className="hidden lg:block h-screen lg:w-3/12 pl-16 pt-5 space-y-5">
                {dashboardMenu}
            </ul>
            {/* -------Mobile Sidebar------*/}
            <div className="relative lg:hidden">
                <ul className={`menu absolute duration-500 top-0 pl-3 ${dashboardToggle ? 'left-0 ' : 'left-[-250px]'}`}>
                    {dashboardMenu}
                </ul>
            </div>
            {/* Page Content */}
            <div onClick={() => setDashboardToggle(false)} className="bg-slate-50 h-screen w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;