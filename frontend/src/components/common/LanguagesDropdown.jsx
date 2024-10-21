import React from "react";

const LanguagesDropdown = ({ languages, onLanguageChange }) => {
  // Handle the language change event
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    onLanguageChange(selectedLanguage); // Call the provided handler to update the language
  };

  return (
    <div className="languages-dropdown">
      <label htmlFor="languages">Select Language:</label>
      <select id="languages" onChange={handleLanguageChange}>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguagesDropdown;
