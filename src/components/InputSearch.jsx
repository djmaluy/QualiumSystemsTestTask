import React from "react";
import classes from "../pages/mainView/MainView.module.css";

export const InputSearch = ({ setSearchValue }) => {
  return (
    <form>
      <input
        placeholder="Enter title"
        className={classes.inputSearch}
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
};
