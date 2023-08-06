import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../Home/ServiceCard";
import { useEffect, useState } from "react";

const ManageServices = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/services/')
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, []);

    // const { data, isError, error, isLoading } = useQuery({
    //     queryKey: ['services'],
    //     queryFn: () => fetch('http://localhost:5000/services/')
    //         .then(res => {
    //             res.json();
    //             console.log(res);
    //         })
    // })

    // if (isLoading) {
    //     return <p>loading...</p>
    // }

    // if (isError || error) {
    //     console.log(isError && isError, error && error);
    // }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5'>
            {(data || []).map((services, index) => <ServiceCard
                key={index}
                serviceData={services}
                editService={true}
            />)}
        </div>
    );
};

export default ManageServices;