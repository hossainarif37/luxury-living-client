import Contact from "./Contact";
import Hero from "./Hero";
import Projects from "./Projects";
import Services from "./Services";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div>
            <Hero />
            <Projects />
            <Services />
            <Testimonials />
            <Contact />
        </div>
    );
};

export default Home;