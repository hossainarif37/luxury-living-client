import { useContext } from "react";
import Contact from "./Contact";
import Hero from "./Hero";
import Projects from "./Projects";
import Services from "./Services";
import Testimonials from "./Testimonials";
import { Menu } from "../../ContextAPI/ContextAPI";

const Home = () => {
    const { isScroll, setIsScroll } = useContext(Menu);
    console.log(isScroll);
    return (
        <div onScroll={() => setIsScroll((prev) => !prev)}>
            <Hero />
            <Projects />
            <Services />
            <Testimonials />
            <Contact />
        </div>
    );
};

export default Home;