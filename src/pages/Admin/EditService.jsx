import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import BounceLoading from "../../components/BounceLoading";

const EditService = () => {
    const [customError, setCustomError] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const imgToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
    const imgHostUrl = `https://api.imgbb.com/1/upload?key=${imgToken}`
    const [image, setImage] = useState('');
    const [data, setData] = useState({});
    const [dataLoading, setDataLoading] = useState(true);

    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    //* Upload the image to hosting server
    const handleUploadImage = (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        if (formData) {
            setImageLoading(true);
        }
        fetch(imgHostUrl, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(({ data: imageResponse }) => {
                if (imageResponse.id) {
                    setImage(imageResponse.display_url);
                    setImageLoading(false);
                }
            })
    }
    // const { data, isError, error, isLoading, refetch } = useQuery({
    //     queryKey: ['id'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://luxury-living-server-production.up.railway.app/services/${id}`);
    //         return res.json();

    //     }
    // })
    // if (isLoading) {
    //     return <Loading />
    // }
    // if (isError || error) {
    //     console.log(isError && isError, error && error);
    // }


    //* Get Individual service

    useEffect(() => {
        fetch(`https://luxury-living-server-production.up.railway.app/services/${id}`)
            .then(res => res.json())
            .then(data => {
                setDataLoading(false);
                setData(data);
            })
    }, [id])
    if (dataLoading) {
        return <Loading />
    }

    const { title, price, description, img } = data;
    console.log(img);
    //* Update a Service
    const handleUpdateService = (data) => {
        fetch(`https://luxury-living-server-production.up.railway.app/services?id=${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data,
                img: image || img
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount) {
                    // refetch();
                    toast.success('Updated Successfully')
                }

            });
    }
    return (
        <div className='mt-3 lg:ml-3 lg:mr-10'>
            <form onSubmit={handleSubmit(handleUpdateService)} className="flex flex-col lg:bg-white lg:p-7 rounded-2xl gap-y-3 lg:w-1/2">
                {/*//* Title */}
                <div className='space-y-2'>
                    <label className='font-semibold text-primary'>Service Title</label>
                    <input
                        className="input bg-white border"
                        type="text"
                        placeholder="Enter Title"
                        {...register('title', { maxLength: 25 })}
                        defaultValue={title}
                    />
                </div>
                {
                    errors?.title?.type === 'maxLength' && <p className='error'>Max Length 25 character!</p>
                }
                {/*//* Price */}
                <div className="flex flex-col space-y-2">
                    <label className='font-semibold text-primary' htmlFor="service-price">Price</label>
                    <input
                        className="input bg-white border"
                        type="number"
                        placeholder="Enter Price"
                        {...register('price', { maxLength: 25 })}
                        defaultValue={price}
                    />
                </div>
                {
                    errors?.price?.type === 'maxLength' && <p className='error'>Max Length 25 character!</p>
                }
                {/*//* Description */}
                <div className="flex flex-col space-y-2">
                    <label className='font-semibold text-primary' htmlFor="service-description">Description</label>
                    <textarea
                        className='textarea bg-white border'
                        placeholder='Enter Description'
                        id="service-description"
                        rows="2"
                        {...register('description')}
                        defaultValue={description}

                    ></textarea>
                </div>

                {/*//* File */}
                <div className=" space-y-2">
                    <label className='font-semibold text-primary'>Image</label>
                    {/* Selected Image */}
                    {
                        img && <div className={`w-56 h-56 p-2  mb-5 border-2 border-[#251D58] rounded-full ${imageLoading && 'flex justify-center items-center'}`}>
                            {imageLoading ? <BounceLoading /> : <img src={image ? image : img} className='w-full h-full rounded-full' alt="" />}
                        </div>
                    }
                    {/* Upload Image Button */}
                    <div className="input w-40 bg-[#EDEAFF] border border-[#251D58] relative flex items-center gap-2">
                        <AiOutlineCloudUpload className='text-2xl' />
                        <span className='text-secondary'>Upload Image</span>
                        <input
                            onChange={handleUploadImage}
                            className="absolute inset-0 opacity-0"
                            type="file"
                            accept='.jpeg, .png, .jpg'

                        />

                    </div>
                </div>
                {
                    customError && <p className='error'>{customError}</p>
                }
                {/* Update Button */}
                <input type="submit" value="Update" className='btn mt-3 cursor-pointer' />

            </form>
        </div>
    );
};

export default EditService;