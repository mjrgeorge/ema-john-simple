import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd=>pd.key===productKey);
    return (
        <div>
            <h1>{productKey}Your Product Detail</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;