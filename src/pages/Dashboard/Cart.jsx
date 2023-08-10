import { useAuthState } from 'react-firebase-hooks/auth'
import auth from "../../firebase.init";
import CartCard from "./CartCard";
import { useQuery } from "@tanstack/react-query";
import Loading from '../../components/Loading';

const Cart = () => {
    const [user] = useAuthState(auth);

    //* Get all cart of this user by using Tanstack Query
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['email'],
        queryFn: () => fetch(`http://localhost:5000/cart?email=${user.email}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading />
    }
    if (isError || error) {
        console.log(isError && isError, error && error);
    }

    return (
        <section className="">
            <h1 className="text-2xl font-bold text-primary">My Cart</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 pt-10'>
                {data.map((data, index) => <CartCard
                    key={index}
                    cartData={data}
                    cartStyles={true}
                    refetch={refetch}
                />)}
            </div>
        </section>
    );
};

export default Cart;