import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import api from "./api/db";
import uuid from "react-uuid";
import { useServerData } from "./components/useServerData";
import { CartView } from "./pages/cartView/CartView";
import { CreateView } from "./pages/createView/CreateView";
import { EditView } from "./pages/editView/EditView";
import { MainView } from "./pages/mainView/MainView";
import { PageNotFound } from "./pages/pageNotFound/PageNotFound";

const App = () => {
  const [
    {
      productsData,
      isFetching,
      isError,
      setProductsData,
      cartProducts,
      setCartProducts,
    },
  ] = useServerData();
  const [searchText, setSearchText] = useState("");

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>...error</div>;
  }
  //  ===  Filtering by title
  const onSearchClick = (text) => {
    setSearchText(text);
  };
  const getFilteredData = () => {
    if (!searchText) {
      return productsData;
    }
    return productsData.filter((p) => {
      return p["title"].toLowerCase().includes(searchText.toLowerCase());
    });
  };
  const filteredData = getFilteredData();

  // === Deleting product
  const onDeleteItem = (id) => {
    setProductsData([...productsData.filter((product) => product.id !== id)]); //Возможно я неправильно понял и надо было удалять из сервера !?
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
  //  === add and remove quantity products in basket
  const addProductToCart = (product) => {
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
  const removeProductFromCart = (product) => {
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
              filteredData={filteredData}
              onSearchClick={onSearchClick}
            />
          )}
        />
        <Route
          path="/cartView"
          render={() => (
            <CartView
              isFetching={isFetching}
              isError={isError}
              cartProducts={cartProducts}
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
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
          path="/createView"
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
