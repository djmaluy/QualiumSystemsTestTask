import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import classes from "../pages/mainView/MainView.module.css";
import { ProductCard } from "./ProductCard";

export const Cards = ({ filteredData, onDeleteItem, addToCart }) => {
  const [currentPage, setCurrentPage] = useState(0); // currentPage is the index of the page selected by the user

  const PER_PAGE = 10; // PER_PAGE holds the number of items to be displayed on each page.
  const offset = currentPage * PER_PAGE; //is the number of items that have already been displayed by the previous pages
  const currentPageData = filteredData.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(filteredData.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <>
      <div className={classes.cards}>
        {currentPageData.map((product) => {
          return (
            <div key={product.id} className={classes.card}>
              <ProductCard
                product={product}
                onDeleteItem={onDeleteItem}
                addToCart={addToCart}
              />
            </div>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>
  );
};
