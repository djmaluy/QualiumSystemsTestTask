import React from "react";
import { Link } from "react-router-dom";
import { InputSearch } from "../../components/InputSearch";
import { Cards } from "../../components/Cards";
import classes from "./MainView.module.css";

export const MainView = ({
  onSearchClick,
  filteredData,
  onDeleteItem,
  addToCart,
  isFetching,
}) => {
  return (
    <div>
      <div className={classes.contentHead}>
        <div>
          <InputSearch onSearchClick={onSearchClick} />
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
        <Cards
          filteredData={filteredData}
          onDeleteItem={onDeleteItem}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};
