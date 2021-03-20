import React from "react";
import { BasketCard } from "../../components/BasketCard";
import classes from "./CartView.module.css";

export const CartView = ({
  cartProducts,
  increment,
  decrement,
  deleteFromCart,
}) => {
  const totalPrice = cartProducts.reduce((a, c) => a + c.quantity * c.price, 0);
  return (
    <>
      <div className={classes.wrapper}>
        {cartProducts.map((product) => (
          <div className={classes.details} key={product.id}>
            <BasketCard
              product={product}
              increment={increment}
              decrement={decrement}
            />
            <div
              className={classes.delete}
              onClick={() => deleteFromCart(product.id)}
            >
              X
            </div>
          </div>
        ))}
        <div className={classes.total}>
          <h3>Total:{totalPrice} </h3>
        </div>
      </div>
    </>
  );
};
