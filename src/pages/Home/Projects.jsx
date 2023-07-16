import project1 from '../../assets/Image/project1.png'
import project2 from '../../assets/Image/project2.png'
import project3 from '../../assets/Image/project3.png'
import ProjectCard from './ProjectCard';
const Projects = () => {
    const projectInfo = [
        {
            img: project1,
            title: 'Villa on Washington Avenue',
            location: 'Dhaka, Bangladesh'
        },
        {
            img: project2,
            title: 'Luxury villa in Rego Park',
            location: 'Dhaka, Bangladesh'
        },
        {
            img: project3,
            title: 'Gorgeous house',
            location: 'Dhaka, Bangladesh'
        },
    ]
    return (
        <div className="lg:padding lg:py-20">
            <div className="text-center lg:mb-14">
                <h2 className="font-semibold text-secondary">Projects</h2>
                <h1 className="text-4xl font-bold text-primary">Discover the latest Interior Design <br />
                    available today</h1>
            </div>
            <div className='flex flex-col lg:flex-row gap-5'>
                {
                    projectInfo.map((data, index) => <ProjectCard
                        key={index}
                        projectInfo={data}
                    />)
                }
            </div>
        </div>
    );
};

export default Projects;    