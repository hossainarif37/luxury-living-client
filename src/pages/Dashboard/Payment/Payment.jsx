import { useParams } from "react-router-dom";
import credit_card from '../../../assets/Icon/credit_card.png'
import paypal from '../../../assets/Icon/paypal.png'
import { useEffect, useState } from "react";

const Payment = () => {
    const { id: paramsId } = useParams();
    const [cart, setCart] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/cart/${paramsId}`)
            .then(res => res.json())
            .then(data => {
                setCart(data);
            })
    }, [])

    const { title, price } = cart;
    return (
        <div className="lg:px-5 px-3">
            <h1 className="text-2xl font-bold text-primary">Payment</h1>
            {/* ---------Form--------- */}
            <div className="lg:w-1/2 mt-7">
                <div className="space-y-3">
                    <input className="input text-gray-700 bg-white" type="text" value='Md Arif' disabled />
                    <input className="input text-gray-700 bg-white" type="email" value='onexboyarif6833@gmail.com' disabled />
                    <input className="input text-gray-700 bg-white" type="text" value={title} disabled />
                </div>
                {/* Card Selector Start */}
                <div className="py-5">
                    <p className="mb-3 text-gray-500">Pay with</p>
                    <div className="flex gap-10">
                        {/* Credit Card */}
                        <div className="flex items-center gap-2 ">
                            <input className="cursor-pointer" type="radio" name="payment-option" id="credit-card" />
                            <label className="flex gap-2 cursor-pointer" htmlFor="credit-card"><img className="w-6" src={credit_card} alt="" /> <span>Credit Card</span></label>
                        </div>
                        {/* Paypal */}
                        <div className="flex items-center gap-2 ">
                            <input className="cursor-pointer" type="radio" name="payment-option" id="paypal" />
                            <label className="flex gap-2 cursor-pointer" htmlFor="paypal"><img className="w-6 h-6" src={paypal} alt="" /> <span>Paypal</span></label>
                        </div>
                    </div>
                </div>
                {/* Card Selector End */}
                {/* Card Input Start */}
                <div className="space-y-3">
                    <input className="input bg-white" type="text" placeholder="Card Number" />
                    <div className="flex gap-3">
                        <input className="input bg-white" type="text" placeholder="MM/YY" />
                        <input className="input bg-white" type="text" placeholder="CVC" />
                    </div>
                </div>
                {/* Card Input End */}
                <div className="flex flex-col lg:flex-row space-y-3 justify-between items-center mt-5">
                    <p className="text-gray-800 ">Your Service Charge will be <span className="font-bold">${price}</span></p>
                    <button className="btn">Pay</button>
                </div>
            </div>
        </div >
    );
};

export default Payment;