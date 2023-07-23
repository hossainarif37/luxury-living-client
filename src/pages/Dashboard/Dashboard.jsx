import { Link } from "react-router-dom";
import cart from "../../assets/Icon/cart.png"
import order_list from "../../assets/Icon/order_list.png"
import review from "../../assets/Icon/review.png"
import Drawer from "../../components/Drawer";

const Dashboard = () => {
    const menuItems = <>
        <li><Link className="flex gap-3 items-center" to='cart'><img className="w-6" src={cart} alt="" />Cart</Link></li>
        <li><Link className="flex gap-3 items-center" to='order-list'><img className="w-6" src={order_list} alt="" />Order List</Link></li>
        <li><Link className="flex gap-3 items-center" to='review'><img className="w-6" src={review} alt="" />Review</Link></li>
    </>
    return (
        <Drawer menuItems={menuItems} />
    );
};

export default Dashboard;