import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './CheckoutForm.css'

const CheckoutForm = ({ setCardError, price, setTransactionId, cart, paymentMethod }) => {
    const [user] = useAuthState(auth);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const { _id, img, title, description } = cart;
    const navigate = useNavigate();



    useEffect(() => {
        fetch('https://luxury-living-server-production.up.railway.app/create-payment-intent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price
            })
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret)
            })
    }, [price])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTransactionId('');
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })


        if (error) {
            setCardError(error);
            console.log('[error]', error);
        } else {
            setCardError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }
        setProcessing(false);

        if (paymentIntent.status === 'succeeded') {


            //* Save payment system to the server
            const orderData = {
                userName: user.displayName,
                email: user.email,
                img: img,
                title: title,
                description: description,
                deliveryStatus: "Pending",
                paymentMethod: paymentMethod
            }
            fetch('https://luxury-living-server-production.up.railway.app/orders', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(orderData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        //! Delete this Item from Cart
                        fetch(`https://luxury-living-server-production.up.railway.app/cart?id=${_id}`, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.deletedCount) {
                                    toast.success('Order Successful and Remove this Item from Cart');
                                    //? Set Transaction Id as a Variable
                                    setTransactionId(paymentIntent.id);
                                }
                            })


                        setTimeout(() => {
                            navigate('/dashboard/order-list')
                        }, 5000);
                    }
                })


        }


    }
    return (
        <form
            onSubmit={handleSubmit}
            className={`${paymentMethod === 'Credit Card' ? 'block' : 'hidden'}`}
        >
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                            backgroundColor: 'white',
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className={`btn mt-5 ${(!stripe || !elements || processing) && 'bg-gray-400 active:scale-100'}`}
                type="submit"
                disabled={(!stripe || !clientSecret || processing) && true}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;