import React from "react";
import classes from "./EditView.module.css";

export const EditViewFormInputs = ({ state, handleChange }) => {
  return (
    <>
      <li>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          name="title"
          value={state.title}
          onChange={(e) => handleChange(e)}
        />
      </li>
      <li>
        <label htmlFor="price">Price: </label>
        <input
          id="price"
          type="number"
          name="price"
          value={state.price}
          onChange={(e) => handleChange(e)}
        />
      </li>
      <li>
        <label htmlFor="description">Description: </label>
        <input
          id="description"
          type="text"
          name="description"
          value={state.description}
          onChange={(e) => handleChange(e)}
        />
      </li>
      <li>
        <button className={classes.editButton}>Update</button>
      </li>
    </>
  );
};
