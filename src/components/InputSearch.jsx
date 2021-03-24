import React from "react";
import classes from "../pages/mainView/MainView.module.css";

export const InputSearch = ({ searchValue, setSearchValue }) => {
  return (
    <form>
      <input
        placeholder="Enter title"
        className={classes.inputSearch}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
};
