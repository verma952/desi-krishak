// src/components/Sell/Sell.js - Refactored

import React, { useState } from 'react';
import ProductSelector from './ProductSelector';
import ProductForm from './ProductForm';
import Stepper from './Stepper'; // A new component for the progress steps
import './Sell.css'; // The new CSS file

function Sell() {
  const [step, setStep] = useState(1);
  const [productCategory, setProductCategory] = useState('');

  const handleCategorySelect = (category) => {
    setProductCategory(category);
    setStep(2); // Move to the next step
  };

  const handleGoBack = () => {
    setProductCategory('');
    setStep(1); // Go back to the first step
  };

  return (
    <div className="sell-page-container">
      <div className="sell-form-wrapper">
        <Stepper currentStep={step} />
        {step === 1 ? (
          <ProductSelector onSelect={handleCategorySelect} />
        ) : (
          <ProductForm category={productCategory} onBack={handleGoBack} />
        )}
      </div>
    </div>
  );
}

export default Sell;