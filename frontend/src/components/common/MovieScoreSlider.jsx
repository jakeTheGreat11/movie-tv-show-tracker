import React, { useState } from "react";
import { useDiscoverStore } from "../../store/useDiscoverStore";

const MovieScoreSlider = () => {
  const { setMinMovieRating, minMovieRating } = useDiscoverStore();
  const minValue = 0;
  const maxValue = 10;

  const handleChange = (e) => {
    setMinMovieRating(parseInt(e.target.value));
  };

  return (
    <div className="ticked-range-slider">
      <label>Minumum Movie score: {minMovieRating}</label>
      <div className="slider-container">
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step="1"
          value={minMovieRating}
          onChange={handleChange}
          className="slider"
          list="tickmarks"
          data-tooltip={minMovieRating}
          style={{ marginTop: "20px" }}
        />
        <datalist id="tickmarks">
          {Array.from({ length: maxValue + 1 }, (_, i) => (
            <option key={i} value={i} label={i}></option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default MovieScoreSlider;
