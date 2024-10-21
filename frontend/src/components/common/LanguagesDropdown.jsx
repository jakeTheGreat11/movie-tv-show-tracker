import React, { useEffect } from "react";
import { useMovieStore } from "../../store/movieStore";

const LanguagesDropdown = ({ onLanguageChange }) => {
  const { languages, fetchLanguages } = useMovieStore();

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    onLanguageChange(selectedLanguage);
  };

  const sortedLanguages = languages
    ? [...languages].sort((a, b) =>
        a.english_name.localeCompare(b.english_name)
      )
    : [];

  return (
    <div className="languages-dropdown">
      <label htmlFor="languages">Select Language:</label>
      <select id="languages" onChange={handleLanguageChange}>
        {sortedLanguages.length > 0 ? (
          sortedLanguages.map((lang) => (
            <option key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.english_name}
            </option>
          ))
        ) : (
          <option value="">Loading...</option>
        )}
      </select>
    </div>
  );
};

export default LanguagesDropdown;
