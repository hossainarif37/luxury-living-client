import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Hero from "./Hero";
import Projects from "./Projects";
import Services from "./Services";
import Testimonials from "./Testimonials";
import { BsFillArrowUpSquareFill } from 'react-icons/bs'

const Home = () => {
    const navigate = useNavigate();

    const handleAchorLink = async (e, hashroute) => {
        e.preventDefault();
        await navigate('/');
        window.location.hash = hashroute;
    }
    return (
        <div>
            <Hero />
            <Projects />
            <Services />
            <Testimonials />
            <Contact />
            <a href='' onClick={(e) => handleAchorLink(e, 'home')} className="text-4xl fixed bottom-5 right-3">
                <BsFillArrowUpSquareFill />
            </a>
        </div>
    );
};

export default Home;