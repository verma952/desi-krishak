function SubTypeField({ category, subType, onChange }) {
    if (category === 'cattle') {
      return (
        <select name="subType" value={subType} onChange={onChange} required>
          <option value="">Select Cattle Type</option>
          <option value="cow">Cow</option>
          <option value="buffalo">Buffalo</option>
          <option value="goat">Goat</option>
        </select>
      );
    }
    if (category === 'dairy') {
      return (
        <select name="subType" value={subType} onChange={onChange} required>
          <option value="">Select Dairy Product</option>
          <option value="milk">Milk</option>
          <option value="curd">Curd</option>
          <option value="paneer">Paneer</option>
        </select>
      );
    }
    return null;
  }
  
  export default SubTypeField;
  