import React from "react";
import { useState } from "react";
import "./Checkbox.css";
import { useMediaPageStore } from "../../store/mediaPageStore";

// later on ill probably pass isWatched prop
const CheckBox = ({ isSeason }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { addSeasonToWatchlist, addEpisodeToWatchlist } = useMediaPageStore();
  const { user } = useAuthStore();
  const userId = user ? user.id : null;

  userId, mediaId, episodeId, watched;
  const handleClick = () => {
    // setIsChecked(!isChecked);
    if (isSeason) {
      addSeasonToWatchlist(userId);
    }
  };

  return (
    <div className="checkbox-wrapper-31">
      <input defaultChecked={isChecked} type="checkbox" onClick={handleClick} />
      <svg viewBox="0 0 35.6 35.6">
        <circle className="background" cx="17.8" cy="17.8" r="17.8" />
        <circle className="stroke" cx="17.8" cy="17.8" r="14.37" />
        <polyline
          className="check"
          points="11.78 18.12 15.55 22.23 25.17 12.87"
        />
      </svg>
    </div>
  );
};

export default CheckBox;
