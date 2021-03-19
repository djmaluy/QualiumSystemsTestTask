import React from "react";
import { Link } from "react-router-dom";
import { InputSearch } from "../../components/InputSearch";
import { Pagination } from "../../components/Pagination";
import classes from "./MainView.module.css";

export const MainView = ({
  onSearchClick,
  filteredData,
  onDeleteItem,
  addProductToCart,
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
      <Pagination
        filteredData={filteredData}
        onDeleteItem={onDeleteItem}
        addProductToCart={addProductToCart}
      />
    </div>
  );
};
