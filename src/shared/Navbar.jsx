import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Icon/nav_logo.png';
import { AiOutlineMenu } from 'react-icons/ai'
import { useContext } from 'react';
import { Menu } from '../ContextAPI/ContextAPI';
// import './Navbar.css'
const Navbar = () => {
    const navigate = useNavigate();
    // Get context provider value by using Context API
    const { dashboardToggle, setDashboardToggle, navToggle, setNavToggle } = useContext(Menu);
    // Location Start
    const location = useLocation();
    const isDashboard = location.pathname.includes('dashboard');
    const authPage = location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('dashboard') ? 'bg-white' : 'bg-[#F6F6F6]';
    // Location End

    // Menu Items
    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/projects'>Projects</Link></li>
        <li><Link to='/contacts'>Contacts</Link></li>
        <li><Link to='/dashboard/cart'>Dashboard</Link></li>
    </>
    return (
        <nav className={`flex justify-between items-center ${isDashboard ? 'lg:px-16' : 'lg:padding'} lg:mx-auto lg:pt-5 ${authPage} px-3 py-3  z-50`}>
            {/* Dashboard Menu Button */}
            <button onClick={() => {
                setDashboardToggle((prev) => !prev);
                navToggle && setNavToggle((prev) => !prev)
            }} className={`text-3xl ${isDashboard ? 'block' : 'hidden'} lg:hidden active:scale-95`}>
                <AiOutlineMenu />
            </button>
            <Link to='/'><img className='w-[84px]' src={logo} alt="nav_logo" /></Link>
            {/*---------- Mobile ---------- */}
            <div className='relative lg:hidden '>
                <button onClick={() => {
                    setNavToggle((prev) => !prev)
                    dashboardToggle && setDashboardToggle((prev) => !prev)
                }}
                    className='text-3xl active:scale-95'>
                    <AiOutlineMenu />
                </button>
                {/* menu */}
                <ul className={`menu duration-500  ${navToggle ? 'right-0' : 'right-[-250px]'}`}>
                    {menuItems}
                    <button onClick={() => navigate('/login')} className='btn w-10/12'>Login</button>
                </ul>
            </div>

            {/*---------- Desktop ---------- */}
            <ul className='hidden lg:flex gap-10'>
                {menuItems}
            </ul>
            <Link className='btn hidden lg:block' to='/login'>Login</Link>
        </nav>
    );
};

export default Navbar;