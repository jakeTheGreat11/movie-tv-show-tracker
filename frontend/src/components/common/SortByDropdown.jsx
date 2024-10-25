import React from "react";
import { useDiscoverStore } from "../../store/useDiscoverStore";

const SortByDropdown = () => {
  const { setSortBy, sortOptions } = useDiscoverStore();

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="sort-by-dropdown">
      <label htmlFor="sortBy">Sort By:</label>
      <select id="sortBy" onChange={handleSortChange}>
        <option value="" disabled selected>
          Select sorting option
        </option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortByDropdown;
