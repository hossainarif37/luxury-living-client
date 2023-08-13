import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Icon/nav_logo.png';
import { AiOutlineMenu } from 'react-icons/ai'
import { useContext } from 'react';
import { Menu } from '../ContextAPI/ContextAPI';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';
const Navbar = () => {
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    const navigate = useNavigate();
    const location = useLocation();

    const [isAdmin] = useAdmin(user?.email);



    // Get context provider value by using Context API
    const { navToggle, setNavToggle, drawerToggle, setDrawerToggle } = useContext(Menu);

    // Location Start
    const isDashboard = location.pathname.includes('dashboard');
    const isAdminPage = location.pathname.includes('admin');
    const authPage = location.pathname.includes('login') || location.pathname.includes('register') || isDashboard || isAdminPage ? 'bg-white' : 'bg-[#F6F6F6]';
    // Location End

    const handleAchorLink = async (e, hashroute) => {
        e.preventDefault();
        await navigate('/');
        window.location.hash = hashroute;
    }
    // Menu Items
    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><a href='' onClick={(e) => handleAchorLink(e, 'services')}>Services</a></li>
        <li><a href='' onClick={(e) => handleAchorLink(e, 'project')}>Projects</a></li>
        <li><Link to='/contacts'>Contacts</Link></li>
        {(user && isAdmin) ? <li><Link to='/admin/user-order'>Admin</Link></li> : <li><Link to='/dashboard/cart'>Dashboard</Link></li>
        }
    </>

    return (
        <nav id='navbar' className={`flex justify-between items-center  sticky top-0 ${isDashboard ? 'lg:px-16' : 'lg:padding'}  lg:pt-5 ${authPage} px-3 py-3  z-50`}>

            {/* Drawer Button Start*/}
            <button onClick={() => {
                setDrawerToggle((prev) => !prev);
                navToggle && setNavToggle((prev) => !prev)
            }} className={`text-3xl ${isAdminPage || isDashboard ? 'block' : 'hidden'} lg:hidden active:scale-95`}>
                <AiOutlineMenu />
            </button>
            {/* Drawer Button End*/}

            {/* Nav Logo */}
            <Link to='/'><img className='w-[84px]' src={logo} alt="nav_logo" /></Link>

            {/*---------- Mobile Version ---------- */}
            <div className='relative lg:hidden '>
                {/* Navbar Menu Button */}
                <button onClick={() => {
                    setNavToggle((prev) => !prev);
                    drawerToggle && setDrawerToggle((prev) => !prev);
                }}
                    className='text-3xl active:scale-95'>
                    <AiOutlineMenu />
                </button>
                {/* menu */}
                <ul className={`menu duration-500  ${navToggle ? 'right-0' : 'right-[-250px]'}`}>
                    {menuItems}
                    {/*//* Button */}
                    {user ? <button
                        className='btn bg-gray-500 font-bold px-7 w-10/12'
                        onClick={() => {
                            signOut();
                            navigate('/')
                        }}
                    >Logout</button> : <button onClick={() => navigate('/login')} className='btn w-10/12'>Login</button>}

                </ul>
            </div>

            {/*---------- Desktop Version ---------- */}
            <ul className='hidden lg:flex gap-10'>
                {menuItems}
            </ul>
            {
                user ? <button
                    className='btn bg-gray-500 font-bold px-7 hidden lg:block'
                    onClick={() => {
                        signOut();
                        navigate('/')
                    }}
                >Logout</button> :
                    <Link className='btn hidden lg:block' to='/login'>Login</Link>
            }
        </nav>
    );
};

export default Navbar;