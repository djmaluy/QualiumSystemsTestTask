import React from "react";
import classes from "../pages/mainView/MainView.module.css";
import { PER_PAGE } from "../utils/constants";
import { ProductCard } from "./ProductCard";

export const Cards = ({
  productsData,
  onDeleteItem,
  addToCart,
  page,
  search,
}) => {
  const startIndex = (page - 1) * PER_PAGE;
  const selectedProducts = productsData.slice(
    startIndex,
    startIndex + PER_PAGE
  );

  return (
    <div className={classes.cards}>
      {selectedProducts.map((product) => {
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
