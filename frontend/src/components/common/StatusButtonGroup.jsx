import React, { useEffect, useState } from "react";
import { useMediaPageStore } from "../../store/mediaPageStore";
import "./StatusButtonGroup.css";
import StatusButton from "./StatusButton";

const StatusButtonGroup = ({ mediaId, mediaType, userId }) => {
  //currentStatus, onStatusChange
  const {
    watchlistStatus,
    addToWatchlist,
    fetchWatchlistStatus,
    setWatchlistStatus,
  } = useMediaPageStore();

  useEffect(() => {
    if (userId) {
      fetchWatchlistStatus(userId, mediaId);
    }
  }, [mediaId, userId]);

  const handleStatusChange = async (status) => {
    const responseMessage = await addToWatchlist(
      mediaId,
      mediaType,
      userId,
      status
    );

    if (responseMessage === "Removed from watchlist") {
      setWatchlistStatus("");
    } else if (
      responseMessage === "Watchlist status updated" ||
      responseMessage === "Added to watchlist"
    ) {
      setWatchlistStatus(status);
    }
  };

  const statuses = ["watched", "plan-to-watch"];
  if (mediaType === "tv-shows") {
    statuses.push("watching");
  }

  return (
    <div className="status-button-group">
      {statuses.map((status) => (
        <StatusButton
          key={status}
          status={status}
          currentStatus={watchlistStatus}
          onClick={() => handleStatusChange(status)}
        />
      ))}
    </div>
  );
};

export default StatusButtonGroup;
