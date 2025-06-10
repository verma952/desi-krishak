function ProductSelector({ onSelect }) {
    return (
      <div>
        <label>Select the type of product you want to sell:</label>
        <select onChange={(e) => onSelect(e.target.value)} defaultValue="">
          <option value="">-- Select --</option>
          <option value="cattle">Cattle</option>
          <option value="dairy">Dairy Product</option>
          <option value="farmingTools">Farming Tools</option>
          <option value="other">Other</option>
        </select>
      </div>
    );
  }
  
  export default ProductSelector;
  