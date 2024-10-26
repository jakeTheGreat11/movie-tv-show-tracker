import React from "react";
import { useDiscoverStore } from "../../store/useDiscoverStore";

const YearSelector = () => {
  const { selectedYear, setSelectedYear } = useDiscoverStore();

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
  };

  return (
    <div>
      <label htmlFor="year">Select Release Year:</label>
      <input
        type="number"
        id="year"
        name="year"
        min="1900"
        max="2099"
        value={selectedYear}
        onChange={handleYearChange}
        placeholder="YYYY"
        step="1"
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default YearSelector;
