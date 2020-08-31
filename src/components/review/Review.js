import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../reviewItems/ReviewItems';

const Review = () => {
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart);

        const cartProducts = productsKeys.map(key =>{
            const product = fakeData.find(pd=>pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    return (
        <div>
            <h1>Cart Item : {cart.length}</h1>
            {
                cart.map(pd=><ReviewItems product={pd} key = {pd.key}></ReviewItems>)
            }
           
        </div>
    );
};

export default Review;