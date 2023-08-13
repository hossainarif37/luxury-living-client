import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";

const ServiceCard = ({ serviceData, index, cartStyles, editService, refetch }) => {
    const [user] = useAuthState(auth);
    const { _id, img, title, description, price } = serviceData;

    //* Added to Cart
    const handleAddedToCart = () => {

        //* Add a cart in database
        fetch('https://luxury-living-server-34zq.onrender.com/cart', {
            method: 'POST',
            body: JSON.stringify(
                {
                    img,
                    title,
                    description,
                    price,
                    email: user.email
                }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success('Added to Cart');
                }
                else {
                    toast.error(data.message)
                }
            });


    }

    //* Deleted a Service
    const handleServiceDelete = () => {

        fetch(`https://luxury-living-server-34zq.onrender.com/services?id=${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success('Service deleted successfully!');
                }
            })

    }



    return (
        <div className={`${index === 1 && 'shadow-lg' || editService && 'shadow-lg'} text-sm rounded-xl text-center p-5`}>
            <img className="w-20 mx-auto" src={img} alt="" />
            <div className="mt-5 space-y-1">
                <h2 className="text-primary font-semibold text-xl">{title}</h2>
                <h3 className="text-secondary text-xl font-semibold">${price}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="flex justify-center gap-3 items-center  mt-5">
                {/*//* Add to Cart Button */}
                {!editService &&
                    <button
                        className="btn bg-amber-500 font-semibold px-5 w-full"
                        onClick={handleAddedToCart}
                    >Add to Cart</button>}
                {/*//* Book Button */}
                {!editService && <Link to={`/dashboard/cart/payment/${_id}`} className={`btn ${!cartStyles && 'w-full px-5 '}`}>Book</Link>}

                {/* Manage Service Button */}
                {/*//* Edit Button */}
                {editService &&
                    <Link onClick={() => refetch()} to={`/admin/manage-services/edit-service/${_id}`}
                        className="btn bg-amber-500 font-semibold px-5 w-full"
                    >Edit</Link>}
                {/*//* Delete Button */}
                {editService &&
                    <button
                        className="btn bg-red-600 font-semibold px-5 w-full"
                        onClick={handleServiceDelete}
                    >Delete</button>}

            </div>
        </div>
    );
};

export default ServiceCard;