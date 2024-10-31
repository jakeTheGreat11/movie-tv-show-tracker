import React, { useEffect, useState } from "react";
import { useMediaPageStore } from "../../store/mediaPageStore";
import "./StatusButtonGroup.css";
import StatusButton from "./StatusButton";

// const { fetchWatchlistStatus, setWatchlistStatus } = useMediaPageStore();
const StatusButtonGroup = ({ mediaType, currentStatus, onStatusChange }) => {
  const statuses = ["watched", "plan-to-watch"];
  if (mediaType === "tv-shows") {
    console.log("media type: ", mediaType);
    statuses.push("watching");
  }

  return (
    <div className="status-button-group">
      {statuses.map((status) => (
        <StatusButton
          key={status}
          status={status}
          currentStatus={currentStatus}
          onClick={onStatusChange}
        />
      ))}
    </div>
  );
};

export default StatusButtonGroup;
