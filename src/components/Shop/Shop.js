import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {

    const frist10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(frist10);
    const [cart, setCart] = useState([]);
    
    const handleAddProduct = (product)=>{
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd=>pd.key===product.key);
        const count = sameProduct.length; 
        addToDatabaseCart(product.key, count);
    };

    return (
        <div className = 'shop_container'>
            <div className="products_container">
                {
                    products.map(pd=> <Product showAddToCart={true} handleAddProduct = {handleAddProduct} product = {pd} key = {pd.key}></Product>)
                }
            </div>
            <div className="cart_container">
                <Cart cart = {cart} ></Cart>
            </div>
        </div>
    );
};

export default Shop;