// src/components/smallComponents/Loader.jsx - Improved Tractor Loader

import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="tractor-loader-improved">
        <div className="tractor-chassis">
          <div className="tractor-cab"></div>
          <div className="tractor-body-front"></div>
          <div className="tractor-chimney"></div>
          <div className="tractor-headlight"></div>
        </div>
        <div className="wheel back-wheel"></div>
        <div className="wheel front-wheel"></div>
      </div>
      <p className="loader-text">Loading... / लोड हो रहा है...</p>
    </div>
  );
}

export default Loader;