import map from '../assets/Icon/map_light.png';
import facebook from '../assets/Icon/facebook.png';
import instagram from '../assets/Icon/instagram.png';
import likedin from '../assets/Icon/linkedin.png';
import youtube from '../assets/Icon/youtube.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="lg:padding bg-primary text-[#ddd] pt-14 pb-7 ">
            <div className=' space-y-5 text-base lg:text-sm lg:space-y-0 flex flex-col lg:flex-row text-center lg:text-start lg:justify-between'>
                <div className='flex flex-col lg:flex-row gap-2 mt-2'>
                    <div>
                        <img className='w-6 mx-auto' src={map} alt="map_image" />
                    </div>
                    <div>
                        <p>H#000 (0th Floor), Road #00, <br />
                            New DOHS, Mohakhali, Dhaka, Bangladesh
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-semibold mb-2 lg:mb-5'>Company</h2>
                    <ul className='footer-menu'>
                        <li><Link to=''>About</Link></li>
                        <li><Link to=''>Project</Link></li>
                        <li><Link to=''>Out Team</Link></li>
                        <li><Link to=''>Terms Conditions</Link></li>
                        <li><Link to=''>Submit Listing</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-xl font-semibold mb-2 lg:mb-5'>Quick Links</h2>
                    <ul className='footer-menu'>
                        <li><Link to=''>Quick Links</Link></li>
                        <li><Link to=''>Rentals</Link></li>
                        <li><Link to=''>Sales</Link></li>
                        <li><Link to=''>Contact</Link></li>
                        <li><Link to=''>Our blog</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-xl font-semibold mb-2 lg:mb-5'>About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur <br />
                        adipiscing elit. Purus commodo ipsum <br />
                        duis laoreet maecenas. Feugiat </p>
                    <div className='flex gap-5 lg:justify-start justify-center items-center mt-3'>
                        <Link to=''><img className='w-6' src={facebook} alt="" /></Link>
                        <Link to=''><img className='w-6' src={instagram} alt="" /></Link>
                        <Link to=''><img className='w-6' src={likedin} alt="" /></Link>
                        <Link to=''><img className='w-6' src={youtube} alt="" /></Link>
                    </div>
                </div>
            </div>
            <p className='text-center text-sm mt-5 lg:mt-10 px-'>Copyright © {year} - All right reserved by <br className='block lg:hidden' />Luxury Living Ltd</p>
        </footer>
    );
};

export default Footer;