import React from "react";
import { Product } from "../../components/Product";
import classes from "./CartView.module.css";

export const CartView = ({
  cartProducts,
  onDelete,
  removeProductFromCart,
  addProductToCart,
}) => {
  const totalPrice = cartProducts.reduce((a, c) => a + c.quantity * c.price, 0);
  return (
    <>
      <div className={classes.shoppingCart}>
        <h2>Корзина</h2>
        {cartProducts.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              removeProductFromCart={removeProductFromCart}
              addProductToCart={addProductToCart}
            />
          );
        })}
        <div className={classes.totalPrice}>
          <div>
            <strong>Total Price</strong>
          </div>
          <div>
            <strong>{totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </>
  );
};
