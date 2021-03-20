import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import classes from "./EditView.module.css";

export const EditView = ({ updateProductHandler }) => {
  const history = useHistory();
  const { id, title, price, description } = useLocation().state.product;
  const [state, setState] = useState({ id, title, price, description });

  const editProduct = (e) => {
    e.preventDefault();
    updateProductHandler(state);
    history.push("/");
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  return (
    <div>
      <form onSubmit={editProduct} className={classes.editForm}>
        <h2>Update product</h2>
        <ul>
          <li>
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              name="title"
              value={state.title}
              onChange={handleChange}
            />
          </li>
          <li>
            <label htmlFor="price">Price: </label>
            <input
              id="price"
              type="number"
              name="price"
              value={state.price}
              onChange={handleChange}
            />
          </li>
          <li>
            <label htmlFor="description">Description: </label>
            <input
              id="description"
              type="text"
              name="description"
              value={state.description}
              onChange={handleChange}
            />
          </li>
          <li>
            <button className={classes.editButton}>Update</button>
          </li>
        </ul>
      </form>
    </div>
  );
};
