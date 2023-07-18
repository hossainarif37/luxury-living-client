import { Link } from 'react-router-dom';
import logo from '../assets/Icon/nav_logo.png';
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react';
// import './Navbar.css'
const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/projects'>Projects</Link></li>
        <li><Link to='/contacts'>Contacts</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
    </>
    return (
        <nav className='flex justify-between items-center lg:padding lg:mx-auto lg:pt-5 px-3 py-3 bg-[#F6F6F6] z-50'>
            <Link to='/'><img className='w-[84px]' src={logo} alt="nav_logo" /></Link>
            {/*---------- Mobile ---------- */}
            <div className='relative lg:hidden '>
                <button onClick={() => setToggle((prev) => !prev)} className='text-3xl active:scale-95'>
                    <AiOutlineMenu />
                </button>
                {/* menu */}
                <ul className={`menu duration-500  ${toggle ? 'right-0' : 'right-[-250px]'}`}>
                    {menuItems}
                    <li><Link className='btn' to='/login'>Login</Link></li>
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