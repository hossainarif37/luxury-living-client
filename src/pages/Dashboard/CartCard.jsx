import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { toast } from "react-hot-toast";

const CartCard = ({ cartData, cartStyles, refetch }) => {
    const [user] = useAuthState(auth);
    const { _id, img, title, description, price } = cartData;

    //? Delete a cart
    const handleCartDelete = () => {
        const confirmDelete = window.confirm();
        console.log(confirmDelete);
        if (confirmDelete) {
            fetch(`https://luxury-living-server-three.vercel.app/cart?id=${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        refetch()
                        toast.success('Deleted Successfully!');
                    }
                })
        }
    }

    return (
        <div className='shadow-lg text-sm rounded-xl text-center p-5'>
            <img className="w-20 mx-auto" src={img} alt="" />
            <div className="mt-5 space-y-1">
                <h2 className="text-primary font-semibold text-xl">{title}</h2>
                <h3 className="text-secondary text-xl font-semibold">${price}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="flex justify-center gap-3 items-center  mt-5">

                {/*//* Book Button */}
                {<Link to={`/dashboard/cart/payment/${_id}`} className={`btn ${!cartStyles && 'w-full px-5 '}`}>Book</Link>}
                {/*//* Book Button */}
                {<button
                    className={`btn bg-red-600 ${!cartStyles && 'w-full px-5 '}`}
                    onClick={handleCartDelete}
                >Remove</button>}
            </div>
        </div>
    );
};

export default CartCard;