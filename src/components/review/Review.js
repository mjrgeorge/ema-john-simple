import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../reviewItems/ReviewItems';
import Cart from '../cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';
import loading from '../../images/loading.gif';


const Review = () => {
    document.title = 'Order Review';
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckOut = () =>{
        history.push('/shipment');
    }

    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd=>pd.key!==productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

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

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className = 'shop_container'>
            {cart.length === 0 && <img style={{width: '100%', height: '100vh'}} src={loading} alt="Loading Spinner"/>}

            <div className="products_container">
                <h1>Cart Item : {cart.length}</h1>
            {
                cart.map(pd=><ReviewItems removeProduct = {removeProduct} product={pd} key = {pd.key}></ReviewItems>)
            }
            {thankYou}
            </div>
            <div className="cart_container">
                <Cart cart={cart}>
                    <button onClick = {handleProceedCheckOut}>Proceed CheckOut</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;