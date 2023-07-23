import { Link } from "react-router-dom";
import order_list_icon from "../../assets/Icon/order_list.png";
import { AiOutlinePlus } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { RxDashboard } from 'react-icons/rx';
import Drawer from "../../components/Drawer";

const Admin = () => {
    const menuItems = <>
        <li><Link to='user-order' className="flex gap-3 items-center" ><img className="w-6" src={order_list_icon} alt="" />User Order</Link></li>

        <li><Link to='add-service' className="flex gap-3 items-center" ><AiOutlinePlus className="text-2xl text-[#878787] " />Add Service</Link></li>

        <li><Link to='manage-services' className="flex gap-3 items-center" ><RxDashboard className="text-xl text-[#878787] " />Manage Services</Link></li>

        <li><Link to='make-admin' className="flex gap-3 items-center" ><BiUserPlus className="text-2xl text-[#878787] " />Make Admin</Link></li>

    </>
    return (
        <>
            {/* Sidebar */}
            <Drawer menuItems={menuItems} />
        </>
    );
};

export default Admin;
