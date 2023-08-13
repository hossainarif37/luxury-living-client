import { useParams } from "react-router-dom";
import credit_card from '../../../assets/Icon/credit_card.png'
import paypal from '../../../assets/Icon/paypal.png'
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { BiCopy, BiSolidCopy } from "react-icons/bi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const Payment = () => {
    const [isCopied, setIsCopied] = useState(false);
    const { id: paramsId } = useParams();
    const [user, userLoading] = useAuthState(auth);
    const [cardError, setCardError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    console.log(paymentMethod);
    const { data: cart, isLoading, isError, refetch } = useQuery({
        queryKey: ['paramsId'],
        queryFn: () => fetch(`https://luxury-living-server-production.up.railway.app/cart/${paramsId}`)
            .then(res => res.json())
    })

    if (isLoading || userLoading) {
        return <Loading />
    }
    if (isError) {
        console.log(isError);
    }
    const handleCopy = () => {
        setIsCopied(true);
        navigator.clipboard.writeText('4242424242424242');
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }

    const { title, price } = cart;
    return (
        <div className="lg:px-5 px-3">
            <h1 className="text-2xl font-bold text-primary">Payment</h1>

            {/* ---------Form--------- */}
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
                <div className="lg:w-1/2 mt-7">
                    <div className="space-y-3">
                        <input className="input text-gray-700 bg-white" type="text" value={user?.displayName} disabled />
                        <input className="input text-gray-700 bg-white" type="email" value={user?.email} disabled />
                        <input className="input text-gray-700 bg-white" type="text" value={title} disabled />
                    </div>

                    {/* Card Selector Start */}
                    <div className="py-5">
                        <p className="mb-3 text-gray-500">Pay with</p>
                        <div className="flex gap-10">
                            {/* Credit Card */}
                            <div className="flex items-center gap-2 ">
                                <input
                                    className="cursor-pointer"
                                    type="radio" name="payment-option"
                                    id="credit-card" value='Credit Card'
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className="flex gap-2 cursor-pointer" htmlFor="credit-card"><img className="w-6" src={credit_card} alt="" /> <span>Credit Card</span></label>
                            </div>
                            {/* Paypal */}
                            <div className="flex items-center gap-2 ">
                                <input
                                    className="cursor-pointer"
                                    type="radio" name="payment-option"
                                    id="paypal" value='Paypal'
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className="flex gap-2 cursor-pointer" htmlFor="paypal"><img className="w-6 h-6" src={paypal} alt="" /> <span>Paypal</span></label>
                            </div>
                        </div>
                    </div>
                    {/* Card Selector End */}
                    {/* Card Input Start */}
                    {/* <div className="space-y-3">
                    <input className="input bg-white" type="text" placeholder="Card Number" />
                    <div className="flex gap-3">
                        <input className="input bg-white" type="text" placeholder="MM/YY" />
                        <input className="input bg-white" type="text" placeholder="CVC" />
                    </div>
                </div> */}

                    <Elements stripe={stripePromise} >
                        <CheckoutForm
                            setCardError={setCardError}
                            setTransactionId={setTransactionId}
                            price={price}
                            cart={cart}
                            paymentMethod={paymentMethod}
                        />
                    </Elements>
                    {cardError && <p className="error mt-3">{cardError.message}</p>}
                    {transactionId && <p className="text-green-500 mt-3">Your transaction is Completed with Transaction Id: <span className="font-semibold">{transactionId}</span></p>}
                    {paymentMethod === 'Paypal' && <p className="error font-semibold mt-3"><span className="font-bold">Paypal</span> is not available at this moment!!!<br /> Please select <span className="font-bold">Credit Card</span>.</p>}


                    {/* Card Input End */}
                    <div className={`flex flex-col ${paymentMethod === 'Credit Card' ? 'block' : 'hidden'}  lg:flex-row space-y-3 justify-between items-center mt-5`}>
                        <p className="text-gray-800 ">Your Service Charge will be <span className="font-bold">${price}</span></p>
                    </div>
                </div>

                {/*//* Example Card Information for Test */}
                <div className="p-5 shadow-lg rounded-xl">
                    <h1 className="text-3xl font-bold text-secondary">Example Card for Testing</h1>
                    <div className="flex flex-col gap-y-3 items-center justify-center relative text-secondary">
                        <div className="flex   gap-2 mt-3">
                            {isCopied && <span className="absolute right-3 text-green-600 ">Copied!</span>}
                            <span
                                onClick={handleCopy}
                                className='cursor-pointer text-2xl text-green-600'
                            >
                                {isCopied ? <BiSolidCopy /> : <BiCopy />}
                            </span>
                            <span className="text-secondary"> 4242 4242 4242 4242</span>
                        </div>
                        <p className=""><span className="font-bold">MM/YY:</span> [Any Future Date]</p>
                        <p className=""><span className="font-bold">CVC:</span> [Any <span className="font-semibold">3</span> Digits]</p>
                        <p className=""><span className="font-bold">ZIP:</span> [Any <span className="font-semibold">5</span> Digits]</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Payment;