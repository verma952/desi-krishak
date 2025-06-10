function CattleExtras({ milkProductionLitersPerDay, onChange }) {
    return (
      <input
        type="number"
        name="milkPerDay"
        placeholder="Milk Production (litres/day)"
        value={milkProductionLitersPerDay}
        onChange={onChange}
        required
      />
    );
  }
  
  export default CattleExtras;
  