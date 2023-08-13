import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../Home/ServiceCard";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const ManageServices = () => {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch('https://luxury-living-server-production.up.railway.app/services/')
    //         .then(res => res.json())
    //         .then(data => {
    //             setData(data);
    //         })
    // }, []);

    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: ['service'],
        queryFn: () => fetch('https://luxury-living-server-production.up.railway.app/services/')
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError || error) {
        console.log(isError && isError, error && error);
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5'>
            {data.map((services, index) => <ServiceCard
                key={index}
                serviceData={services}
                editService={true}
                refetch={refetch}
            />)}
        </div>
    );
};

export default ManageServices;