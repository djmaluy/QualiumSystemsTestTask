import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import classes from "./EditView.module.css";
import { EditViewFormInputs } from "./EditViewFormInputs";

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
          <EditViewFormInputs state={state} handleChange={handleChange} />
        </ul>
      </form>
    </div>
  );
};
