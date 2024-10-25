import React from "react";
import { useDiscoverStore } from "../../store/useDiscoverStore";

const GenreDropdown = () => {
  const { setSelectedGenres, genres, isGenresLoading } = useDiscoverStore();

  const handleCheckBoxChange = (e) => {
    const genre = e.target.id;
    setSelectedGenres(genre);
  };

  return (
    <div>
      <label htmlFor="">Select genre: </label>
      <details class="dropdown">
        <summary>Select Genres...</summary>
        <ul>
          {isGenresLoading ? (
            <li>
              <span aria-busy="true">Loading...</span>
            </li>
          ) : (
            genres.map((genre) => (
              <li key={genre.id}>
                <label>
                  <input
                    type="checkbox"
                    name={genre.name}
                    id={genre.id}
                    onChange={handleCheckBoxChange}
                  />
                  {genre.name}
                </label>
              </li>
            ))
          )}
        </ul>
      </details>
    </div>
  );
};

export default GenreDropdown;
