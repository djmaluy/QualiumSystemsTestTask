import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "../editView/EditView.module.css";

export const useFormField = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const onChange = React.useCallback((e) => setValue(e.target.value), []);
  return { value, onChange };
};

export const CreateView = ({ addProductHandler }) => {
  const history = useHistory();
  const titleInput = useFormField();
  const priceInput = useFormField();
  const descriptionInput = useFormField();

  const addProduct = (e) => {
    e.preventDefault();
    if (
      titleInput.value === "" ||
      priceInput.value === "" ||
      descriptionInput.value === ""
    ) {
      alert("ALl the fields are required!");
      return;
    }
    addProductHandler(
      titleInput.value,
      priceInput.value,
      descriptionInput.value
    );
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={addProduct} className={classes.editForm}>
        <h2>Add product</h2>
        <ul>
          <li>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" {...titleInput} />
          </li>
          <li>
            <label htmlFor="price">Price:</label>
            <input type="number" name="price" {...priceInput} />
          </li>
          <li>
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" {...descriptionInput} />
          </li>
          <li>
            <button className={classes.editButton}>Save</button>
          </li>
        </ul>
      </form>
    </div>
  );
};
