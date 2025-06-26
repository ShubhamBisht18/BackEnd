import React from "react";
import { useLocation } from "react-router-dom";

function Cart() {
    const location = useLocation();
    const CartItems = location.state?.cartItems || []

    const calculateTotal = () => {
        return CartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    };
    return (
            <div>
                <h3>Card Items</h3>
                <div>
                    {CartItems.map((item,index) =>(
                        <div key={index}>
                            <img src={item.image} alt={item.name} width="150" />
                            <p><strong>{item.name}</strong></p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ₹{item.price * item.quantity}</p>
                        </div>
                    ))}
                </div>
                <h3>Grand Total: ₹{calculateTotal()}</h3>
                <button>Pay</button>
            </div>
    )
}

export default Cart