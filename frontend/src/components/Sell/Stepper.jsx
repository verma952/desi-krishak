// src/components/Sell/Stepper.js - NEW FILE
import React from 'react';
import './Stepper.css';

const Stepper = ({ currentStep }) => {
  return (
    <div className="stepper-wrapper">
      <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
        <div className="step-number">1</div>
        <div className="step-label">Select Category</div>
      </div>
      <div className="step-line"></div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
        <div className="step-number">2</div>
        <div className="step-label">Add Details</div>
      </div>
    </div>
  );
};

export default Stepper;