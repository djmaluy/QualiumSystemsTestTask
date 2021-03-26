import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Pagination = ({ pages, setCurrentPage, currentProducts }) => {
  //Set number of pages
  const numberOfPages = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  // Current active button number   // ======= https://www.youtube.com/watch?v=1-Oi3F6Mi9s ====
  const [currentButton, setCurrentButton] = useState(1);
  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton]);

  if (pages <= 1) {
    return null;
  }
  return (
    <div className="pagination-container">
      <Link
        to="#"
        className={`${currentButton === 1 ? "disabled" : ""}`}
        onClick={() =>
          setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1))
        }
      >
        Prev
      </Link>

      {numberOfPages.map((item) => {
        return (
          <Link
            to="#"
            key={item}
            className={`${currentButton === item ? "active" : ""}`}
            onClick={() => setCurrentButton(item)}
          >
            {item}
          </Link>
        );
      })}

      <Link
        to="#"
        className={`${
          currentButton === numberOfPages.length ? "disabled" : ""
        }`}
        onClick={() =>
          setCurrentButton((prev) =>
            prev >= numberOfPages.length ? prev : prev + 1
          )
        }
      >
        Next
      </Link>
    </div>
  );
};
