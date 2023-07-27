import { serviceData } from "../../../public/serviceData";
import ServiceCard from "../Home/ServiceCard";

const ManageServices = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5'>
            {serviceData.map((data, index) => <ServiceCard
                key={index}
                serviceData={data}
                cartStyles={true}
                editService={true}
                deleteService={true}
            />)}
        </div>
    );
};

export default ManageServices;