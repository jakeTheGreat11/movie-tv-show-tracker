import React from "react";
import LanguagesDropdown from "../common/LanguagesDropdown";
import MediaScoreSlider from "../common/MediaScoreSlider";
import GenreDropdown from "../common/GenreDropdown";
import SortByDropdown from "../common/SortByDropdown";
import YearSelector from "../common/YearSelector";

const MediaFilter = ({ mediaType, handleSearch }) => {
  return (
    <aside
      className="filters-sidebar"
      style={{
        boxShadow: "0px 0px 54px 11px rgba(0,0,0,0.28)",
      }}
    >
      <form onSubmit={handleSearch}>
        <h2>Filter {mediaType === "movies" ? "Movies" : "TV Shows"}</h2>
        <LanguagesDropdown />
        <hr />
        <MediaScoreSlider mediaType={mediaType} />
        <hr />
        <GenreDropdown />
        <hr />
        <SortByDropdown />
        <hr />
        <YearSelector />
        <button
          type="submit"
          style={{
            backgroundColor: "var(--primary-green)",
            borderColor: "var(--primary-green)",
          }}
        >
          Search
        </button>
      </form>
    </aside>
  );
};

export default MediaFilter;
