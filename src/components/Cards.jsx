import React from "react";
import classes from "../pages/mainView/MainView.module.css";
import { ProductCard } from "./ProductCard";

export const Cards = ({ onDeleteItem, addToCart, currentProducts, search }) => {
  return (
    <div className={classes.cards}>
      {currentProducts.map((product) => {
        return (
          <div key={product.id} className={classes.card}>
            <ProductCard
              product={product}
              onDeleteItem={onDeleteItem}
              addToCart={addToCart}
              search={search}
            />
          </div>
        );
      })}
    </div>
  );
};
