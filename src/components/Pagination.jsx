import React from "react";

export const Pagination = ({ totalPages, handlePageClick }) => {
  const pages = [...Array(totalPages).keys()].map((page) => page + 1);
  return (
    <div>
      {pages.map((page) => (
        <button onClick={() => handlePageClick(page)} key={page}>
          {page}
        </button>
      ))}
    </div>
  );
};
