function CattleExtras({ milkProductionLitersPerDay, onChange }) {
    return (
        <div>
            <label>
                Milk Production (liters per day):
                <input
                    type="number"
                    name="milkProductionLitersPerDay"
                    value={milkProductionLitersPerDay}
                    onChange={onChange}
                    required
                />
            </label>
        </div>
    );
  }
  
  export default CattleExtras;
  