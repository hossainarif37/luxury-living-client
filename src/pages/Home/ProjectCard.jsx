import LocationIcon from "../../components/LocationIcon";

const ProjectCard = ({ projectInfo }) => {
    const { title, img, location } = projectInfo;
    return (
        <div>
            <div className="px-5">
                <img className="w-full lg:w-[375px] h-[300px]" src={img} alt="Project Image" />
            </div>
            <div className="py-5" >
                <h1 className="text-xl text-center font-semibold text-primary">{title}</h1>
                <p className="flex gap-1 justify-center items-center text-gray-600"><LocationIcon /> {location}</p>
            </div>
        </div>
    );
};

export default ProjectCard;