import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import loading from '../../images/loading.gif';


const Shop = () => {
    document.title = ('Shop more');

    const [products, setProducts] = useState(fakeData);
    const [cart, setCart] = useState([]);
    
    const handleAddProduct = (product)=>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd=>pd.key !== toBeAddedKey)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            const others = cart.filter(pd=>pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };
    
    return (
        <div className = 'shop_container'>
            {products.length === 0 && <img style={{width: '100%', height: '100vh'}} src={loading} alt="Loading Spinner"/>}
            <div>
                <div className="products_container">
                    {
                        products.map(pd=> <Product showAddToCart={true} handleAddProduct = {handleAddProduct} product = {pd} key = {pd.key}></Product>)
                    }
                </div>
                <div className="cart_container">
                    <Cart cart = {cart} >
                    <Link to = "/review"><button className="cartBtn">Ordered Review</button></Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;