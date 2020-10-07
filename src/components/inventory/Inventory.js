import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = () => {
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fakeData)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
    }
    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;