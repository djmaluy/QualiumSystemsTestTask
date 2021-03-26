import { useState, useEffect } from "react";
import { PER_PAGE } from "../utils/constants";

export const useServerData = () => {
  const [productsData, setProductsData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const indexOfLastItem = currentPage * PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pages = Math.ceil(filteredProducts.length / PER_PAGE);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsFetching(true);
        const response = await fetch("http://localhost:8000/products");
        const result = await response.json();
        setIsFetching(false);
        setProductsData(result);
      } catch (e) {
        alert(e);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      productsData.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, productsData]);

  // === fetch cart data from api
  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await fetch("http://localhost:8000/cart");
        const data = await response.json();
        setCartProducts(data);
      } catch (e) {
        console.log(e);
      }
    };
    getCart();
  }, []);
  return [
    {
      productsData,
      isFetching,
      setProductsData,
      cartProducts,
      setCartProducts,
      setCurrentPage,
      pages,
      currentProducts,
      filteredProducts,
      setSearchValue,
    },
  ];
};
