import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../pages/mainView/MainView.module.css";

export const ProductCard = ({ product, onDeleteItem }) => {
  const { title, price, description } = product;
  const [isDisabled, setIsDisabled] = useState(false);

  const onClickHandler = () => {
    setIsDisabled(true);
  };
  return (
    <>
      <div className={classes.cardDescription}>
        <div>
          <strong>Title: </strong>
          <span>{title}</span>
        </div>
        <div>
          <strong className={classes.price}>Price: </strong>
          <span>{price}</span>
        </div>
        <div>
          <strong>Description: </strong>
          <span className={classes.cardDescription}>{description}</span>
        </div>
      </div>
      <div className={classes.cardButtons}>
        <Link to={{ pathname: `/editView`, state: { product } }}>
          <button className="button">Edit</button>
        </Link>
        <button className="button" onClick={() => onDeleteItem(product.id)}>
          Delete
        </button>
        <button
          disabled={isDisabled}
          onClick={onClickHandler}
          className="button"
        >
          Add to cart
        </button>
      </div>
    </>
  );
};