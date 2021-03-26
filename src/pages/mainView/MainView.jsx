import React from "react";
import { Link } from "react-router-dom";
import { Cards } from "../../components/Cards";
import classes from "./MainView.module.css";
import { Pagination } from "../../components/Pagination";
import { InputSearch } from "../../components/InputSearch";

export const MainView = ({
  onDeleteItem,
  addToCart,
  isFetching,
  search,
  setCurrentPage,
  pages,
  currentProducts,
  setSearchValue,
}) => {
  return (
    <div>
      <div className={classes.contentHead}>
        <div className={classes.search}>
          <label>Поиск:</label>
          <InputSearch setSearchValue={setSearchValue} />
        </div>
        <div>
          <Link to="/createView">
            <button className="button">Create</button>
          </Link>
          <Link to="/cartView">
            <button className="button">Cart</button>
          </Link>
        </div>
      </div>

      {isFetching ? (
        <div className={classes.loading}>Loading .... </div>
      ) : (
        <>
          <Cards
            onDeleteItem={onDeleteItem}
            addToCart={addToCart}
            search={search}
            currentProducts={currentProducts}
          />
          <Pagination
            setCurrentPage={setCurrentPage}
            pages={pages}
            currentProducts={currentProducts}
          />
        </>
      )}
    </div>
  );
};
