import React, { useEffect } from "react";
import WatchlistFilter from "../components/Filters/WatchlistFilter";
import { useWatchlistStore } from "../store/watchlistStore";
import { useAuthStore } from "../store/authStore";
import MediaCard from "../components/Media/MediaCard";

const WatchlistPage = () => {
  const { watchlistMedia, fetchWatchlist, isLoading } = useWatchlistStore();
  const { user } = useAuthStore();
  const userId = user ? user.id : null;

  const handleStatusChange = (status) => {};

  useEffect(() => {
    if (userId) {
      fetchWatchlist(userId);
    }
  }, [fetchWatchlist]);

  return (
    <div>
      <div className="watchlist-container">
        <div className="watchlist-title"></div>
        <div className="status-button-filter">
          <WatchlistFilter onStatusChange={handleStatusChange} />
        </div>
        <div className="media-grid">
          {!isLoading &&
            watchlistMedia.map((item, index) => (
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
