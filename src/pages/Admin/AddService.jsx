import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import BounceLoading from '../../components/BounceLoading';

const AddService = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageLoading, setImageLoading] = useState(false);
    const imgToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
    const imgHostUrl = `https://api.imgbb.com/1/upload?key=${imgToken}`
    const [customError, setCustomError] = useState('');
    const [img, setImg] = useState('');

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
                    setImg(imageResponse.display_url);
                    setImageLoading(false);
                }
            })
    }

    // //* Add a service in database
    const handleAddService = (data) => {
        fetch('https://luxury-living-server-production.up.railway.app/services', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                img
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success('Service added!');
                    setImg('');
                    reset();
                }
                console.log(data);
            });
    }




    return (
        <div className='mt-3 lg:ml-3 lg:mr-10'>
            <form onSubmit={handleSubmit(handleAddService)} className="flex flex-col lg:bg-white lg:p-7 rounded-2xl gap-y-3 lg:w-1/2">
                {/*//* Title */}
                <div className='space-y-2'>
                    <label className='font-semibold text-primary'>Service Title</label>
                    <input
                        className="input bg-white border"
                        type="text"
                        placeholder="Enter Title"
                        {...register('title', { required: 'Title is required!', maxLength: 25 })}
                    />
                </div>
                {
                    errors?.title?.type === 'required' && <p className='error'>{errors.title.message}</p>
                    || errors?.title?.type === 'maxLength' && <p className='error'>Max Length 25 character!</p>
                }
                {/*//* Price */}
                <div className="flex flex-col space-y-2">
                    <label className='font-semibold text-primary' htmlFor="service-price">Price</label>
                    <input
                        className="input bg-white border"
                        type="number"
                        placeholder="Enter Price"
                        {...register('price', { required: 'Price is required!', maxLength: 25 })}
                    />
                </div>
                {
                    errors?.price?.type === 'required' && <p className='error'>{errors.price.message}</p>
                    || errors?.price?.type === 'maxLength' && <p className='error'>Max Length 25 character!</p>
                }
                {/*//* Description */}
                <div className="flex flex-col space-y-2">
                    <label className='font-semibold text-primary' htmlFor="service-description">Description</label>
                    <textarea
                        className='textarea bg-white border'
                        placeholder='Enter Description'
                        id="service-description"
                        rows="2"
                        {...register('description', { required: 'Description is required!' })}

                    ></textarea>
                </div>
                {
                    errors?.description?.type === 'required' && <p className='error'>{errors.description.message}</p>
                }
                {/*//* File */}
                <div className=" space-y-2">
                    <label className='font-semibold text-primary'>Image</label>
                    {/* Selected Image */}
                    {
                        img && <div className={`w-56 h-56 p-2  mb-5 border-2 border-[#251D58] rounded-full ${imageLoading && 'flex justify-center items-center'}`}>
                            {imageLoading ? <BounceLoading /> : <img src={img} className='w-full h-full rounded-full' alt="" />}
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
                            required

                        />

                    </div>
                </div>
                {
                    customError && <p className='error'>{customError}</p>
                }
                {/* Submit Button */}
                <input type="submit" value="Add Service" className={`btn mt-3 cursor-pointer ${!img && 'bg-gray-400 active:scale-100 cursor-default'}`}
                    disabled={!img} />

            </form>
        </div>
    );
};

export default AddService;