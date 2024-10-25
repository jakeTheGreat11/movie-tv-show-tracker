import React, { useEffect } from "react";
import { useDiscoverStore } from "../../store/useDiscoverStore";

const LanguagesDropdown = () => {
  const { languages, setSelectedLanguage, isLanguagesLoading } =
    useDiscoverStore();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setSelectedLanguage(selectedLanguage);
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
        <option selected disabled value="">
          None selected
        </option>
        {!isLanguagesLoading ? (
          sortedLanguages.map((lang) => (
            <option key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.english_name}
            </option>
          ))
        ) : (
          <option aria-busy="true" value="">
            Loading...
          </option>
        )}
      </select>
    </div>
  );
};

export default LanguagesDropdown;
