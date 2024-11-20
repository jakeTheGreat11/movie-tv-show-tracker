import React, { useState } from "react";
import "./WatchlistFilter.css";

const WatchlistFilter = ({ onStatusChange }) => {
  const statuses = ["All", "watching", "plan-to-watch", "watched"];
  const [activeStatus, setActiveStatus] = useState("All");

  const handleStatusChange = (status) => {
    setActiveStatus(status);

    if (onStatusChange) onStatusChange(status);
  };

  return (
    <div className="filter-button-group cancel-hover">
      {statuses.map((status) => (
        <button
          key={status}
          className={`filter-button ${activeStatus === status ? "active" : ""}`}
          onClick={() => handleStatusChange(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default WatchlistFilter;
