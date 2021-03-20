import React from "react";
import classes from "../pages/cartView/CartView.module.css";

export const BasketCard = ({ product, increment, decrement }) => {
  return (
    <>
      <div className={classes.box}>
        <div className={classes.row}>
          <h2>{product.title}</h2>
          <span>Price: {product.price * product.quantity}</span>
        </div>
        <p>{product.description}</p>
        <div className={classes.amount}>
          <button className={classes.count} onClick={() => decrement(product)}>
            -1
          </button>
          <span>{product.quantity}</span>
          <button className={classes.count} onClick={() => increment(product)}>
            +1
          </button>
        </div>
      </div>
    </>
  );
};
