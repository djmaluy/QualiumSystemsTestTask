import React from "react";
import { Link } from "react-router-dom";
import { InputSearch } from "../../components/InputSearch";
import { Cards } from "../../components/Cards";
import classes from "./MainView.module.css";
import { Pagination } from "../../components/Pagination";

export const MainView = ({
  productsData,
  onDeleteItem,
  addToCart,
  isFetching,
  totalPages,
  handlePageClick,
  page,
  search,
}) => {
  return (
    <div>
      <div className={classes.contentHead}>
        <div></div>
        <div>
          <Link to="/createView">
            <button className="button">Create</button>
          </Link>
          <Link to="/cartView">
            <button className="button">Cart</button>
          </Link>
        </div>
      </div>
      <div>
        <p>Page: {page}</p>
      </div>
      {isFetching ? (
        <div className={classes.loading}>Loading .... </div>
      ) : (
        <>
          <Cards
            productsData={productsData}
            onDeleteItem={onDeleteItem}
            addToCart={addToCart}
            page={page}
            search={search}
          />
          <Pagination
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        </>
      )}
    </div>
  );
};
