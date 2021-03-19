import { useState, useEffect } from "react";

export const useServerData = () => {
  const [productsData, setProductsData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsFetching(true);
        const response = await fetch("http://localhost:8000/products");
        const data = await response.json();
        setProductsData(data);
        setIsFetching(false);
      } catch (e) {
        setIsError(true);
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
      isError,
      setProductsData,
      cartProducts,
      setCartProducts,
    },
  ];
};
