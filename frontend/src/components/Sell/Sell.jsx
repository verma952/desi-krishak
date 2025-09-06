// src/components/Sell/Sell.js - Updated

import React, { useState } from 'react';
import ProductSelector from './ProductSelector';
import ProductForm from './ProductForm';
import Stepper from './Stepper';
import './Sell.css';

// ✨ NEW: Define steps as named constants.
// This makes the code self-documenting and easier to modify or add new steps later.
const STEPS = {
  SELECT_CATEGORY: 1,
  FILL_FORM: 2,
};

/**
 * Manages the multi-step process for posting a product for sale.
 * It controls rendering either the category selector or the product details form.
 */
function Sell() {
  /** @type {[number, React.Dispatch<React.SetStateAction<number>>]} 
   * State to track the current step in the selling process.
  */
  const [step, setStep] = useState(STEPS.SELECT_CATEGORY);

  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} 
   * State to store the category selected by the user.
  */
  const [productCategory, setProductCategory] = useState('');

  /**
   * Handles the selection of a product category and moves to the next step.
   * @param {string} category - The category selected by the user.
   */
  const handleCategorySelect = (category) => {
    setProductCategory(category);
    setStep(STEPS.FILL_FORM); // Move to the form-filling step
  };

  /**
   * Resets the state to go back to the category selection step.
   */
  const handleGoBack = () => {
    setProductCategory('');
    setStep(STEPS.SELECT_CATEGORY); // Go back to the first step
  };

  return (
    <div className="sell-page-container">
      <div className="sell-form-wrapper">
        <Stepper currentStep={step} />
        
        {/* Conditionally render the correct component based on the current step */}
        {step === STEPS.SELECT_CATEGORY ? (
          <ProductSelector onSelect={handleCategorySelect} />
        ) : (
          <ProductForm category={productCategory} onBack={handleGoBack} />
        )}
      </div>
    </div>
  );
}

export default Sell;