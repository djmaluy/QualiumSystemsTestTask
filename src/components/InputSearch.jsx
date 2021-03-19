import React, { useState } from "react";
import classes from "../pages/mainView/MainView.module.css";

export const InputSearch = ({ onSearchClick }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <form>
      <input
        className={classes.inputSearch}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="button"
        onClick={() => onSearchClick(searchValue)}
        className={classes.searchButton}
      >
        Find
      </button>
    </form>
  );
};
