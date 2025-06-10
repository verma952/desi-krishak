import React, { useState } from 'react';
import ProductSelector from './ProductSelector';
import ProductForm from './ProductForm';
import './Sell.css';

function Sell() {
  const [productCategory, setProductCategory] = useState('');

  return (
    <div className="form-container">
      <h2>Sell Your Product</h2>
      {!productCategory ? (
        <ProductSelector onSelect={setProductCategory} />
      ) : (
        <ProductForm category={productCategory} onReset={() => setProductCategory('')} />
      )}
    </div>
  );
}

export default Sell;
