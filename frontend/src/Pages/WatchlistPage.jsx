import React, { useEffect, useState } from "react";
import WatchlistFilter from "../components/Filters/WatchlistFilter";
import { useWatchlistStore } from "../store/watchlistStore";
import { useAuthStore } from "../store/authStore";
import MediaCard from "../components/Media/MediaCard";

const WatchlistPage = () => {
  const { watchlistMedia, fetchWatchlist, isLoading } = useWatchlistStore();
  const { user } = useAuthStore();
  const userId = user ? user.id : null;
  const [sortedWatchlistMedia, setSortedWatchlistMedia] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All"); // Track filter status

  useEffect(() => {
    if (userId) {
      fetchWatchlist(userId);
    }
  }, [userId, fetchWatchlist]);

  useEffect(() => {
    if (watchlistMedia.length > 0) {
      const filteredMedia =
        filterStatus === "All"
          ? watchlistMedia // Include all items if status is "All"
          : watchlistMedia.filter((media) => media.status === filterStatus);
      setSortedWatchlistMedia(filteredMedia);
    }
  }, [watchlistMedia, filterStatus]);

  // Handle status change from WatchlistFilter
  const handleStatusChange = (status) => {
    setFilterStatus(status);
  };
  return (
    <div>
      <div className="watchlist-container">
        <div className="watchlist-title"></div>
        <div className="status-button-filter">
          <WatchlistFilter onStatusChange={handleStatusChange} />
        </div>
        <div className="media-grid">
          {!isLoading &&
            sortedWatchlistMedia.map((item, index) => (
              <MediaCard
                media={item.media}
                media_type={item.media.media_type}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
