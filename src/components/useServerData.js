import { useState, useEffect } from "react";
import { PER_PAGE } from "../utils/constants";

export const useServerData = () => {
  const [productsData, setProductsData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsFetching(true);
        const response = await fetch("http://localhost:8000/products");
        const result = await response.json();
        setIsFetching(false);
        setProductsData(result);

        setTotalPages(Math.ceil(result.length / PER_PAGE));
      } catch (e) {
        alert(e);
      }
    };
    getProducts();
  }, []);

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
      totalPages,
    },
  ];
};
