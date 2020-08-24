import React from 'react';
const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd)=>total+prd.price, 0);
    let shipping = 0;
    if(total>35){
        shipping = 4.99;
    }else if (total>0){
        shipping = 12.99;
    };
    const tax = Math.round(total/10);
    return (
        <div>
            <h2>Order Summary</h2>
            <h3>Items Ordered: {cart.length} </h3>
            <h4>Product Price: {total.toFixed(2)} </h4>
            <h4>Shipping Cost: {shipping} </h4>
            <h5>Tax + Vat: {tax} </h5>
            <h2>Total: {Math.round((total + shipping + tax))} </h2>
        </div>
    );
};

export default Cart;