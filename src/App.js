import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import api from "./api/api";
import uuid from "react-uuid";
import { CartView } from "./pages/cartView/CartView";
import { CreateView } from "./pages/createView/CreateView";
import { EditView } from "./pages/editView/EditView";
import { MainView } from "./pages/mainView/MainView";
import { PageNotFound } from "./pages/pageNotFound/PageNotFound";
import { PER_PAGE } from "./utils/constants";

const App = () => {
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
    getProducts();
  }, []);
  // ==== fetching data from server
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
  useEffect(() => {
    setFilteredProducts(
      productsData.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, productsData]);

  // === Deleting product
  const onDeleteItem = async (id) => {
    await api.delete(`/products/${id}`);
    getProducts();
  };
  // === adding product to db
  const addProductHandler = async (title, price, description) => {
    const request = {
      id: uuid(),
      title,
      price,
      description,
    };
    const response = await api.post("/products", request);
    setProductsData([...productsData, response.data]);
  };
  // === updating productCard
  const updateProductHandler = async (product) => {
    const response = await api.put(`/products/${product.id}`, product);
    setProductsData(
      productsData.map((product) => {
        return product.id === response.data.id ? { ...response.data } : product;
      })
    );
  };
  // === adding product to the cart
  const addToCart = async (product) => {
    const request = {
      ...product,
      quantity: 1,
    };
    const response = await api.post(`/cart/${product.id}`, request);
    setCartProducts([...cartProducts, response.data]);
  };
  const increment = (product) => {
    const exist = cartProducts.find((p) => p.id === product.id);
    if (exist) {
      setCartProducts(
        cartProducts.map((p) =>
          p.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : p
        )
      );
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
  };

  const decrement = (product) => {
    if (product.quantity <= 1) return;
    const exist = cartProducts.find((p) => p.id === product.id);
    if (exist.quantity === 1) {
      setCartProducts(cartProducts.filter((p) => p.id !== product.id));
    } else {
      setCartProducts(
        cartProducts.map((p) =>
          p.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : p
        )
      );
    }
  };
  const deleteFromCart = async (id) => {
    api.delete(`/cart/${id}`);
    const newCartProducts = cartProducts.filter((p) => {
      return p.id !== id;
    });
    setCartProducts(newCartProducts);
  };

  return (
    <div className="container">
      <Switch>
        <Route exact path="/">
          <Redirect to="/mainView" />
        </Route>
        <Route
          path="/mainView"
          render={() => (
            <MainView
              onDeleteItem={onDeleteItem}
              addToCart={addToCart}
              isFetching={isFetching}
              setCurrentPage={setCurrentPage}
              pages={pages}
              currentProducts={currentProducts}
              setSearchValue={setSearchValue}
            />
          )}
        />
        <Route
          path="/cartView"
          render={() => (
            <CartView
              // isFetching={isFetching}
              cartProducts={cartProducts}
              increment={increment}
              decrement={decrement}
              deleteFromCart={deleteFromCart}
            />
          )}
        />
        <Route
          path="/editView"
          render={(props) => (
            <EditView {...props} updateProductHandler={updateProductHandler} />
          )}
        />
        <Route
          path="/createView/"
          render={(props) => (
            <CreateView {...props} addProductHandler={addProductHandler} />
          )}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
