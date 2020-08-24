import React, { useState } from 'react';
import fakeData from '../../fakeData';

const Shop = () => {

    const frist10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(frist10);

    return (
        <div>
            <h1>This is Shop.</h1>
            <ul>
                {
                    products.map(product=> <li>{product.name}</li>)
                }
            </ul>
        </div>
    );
};

export default Shop;