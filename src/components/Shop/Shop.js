import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../product/Product';
import Cart from '../cart/Cart';

const Shop = () => {

    const frist10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(frist10);
    const [cart, setCart] = useState([]);
    
    const handleAddProduct = (product)=>{
        const newCart = [...cart, product];
        setCart(newCart);
    };

    return (
        <div className = 'shop_container'>
            <div className="products_container">
                {
                    products.map(pd=> <Product handleAddProduct = {handleAddProduct} product = {pd} img = {pd.img}></Product>)
                }
            </div>
            <div className="cart_container">
                <Cart cart = {cart} ></Cart>
            </div>
        </div>
    );
};

export default Shop;