import React from 'react';
import './ReviewItem.css';

const ReviewItems = (props) => {
    const {name, quantity, img, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <div>
                    <img src={img} alt=""/>
                </div>
                <div>
                    <h3 className='product_name'>{name}</h3>
                    <h4>Quantity: {quantity}</h4>
                    <p><small>by: {seller}</small></p>
                    <p>${price}</p>
                    <p><small>only {stock} left in stock - order soon</small></p>
                    <button className="cartBtn" onClick = {()=>props.removeProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItems;
