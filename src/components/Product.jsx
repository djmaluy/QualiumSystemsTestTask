import classes from "../pages/cartView/CartView.module.css";

export const Product = ({
  product,
  removeProductFromCart,
  addProductToCart,
}) => {
  return (
    <div key={product.id} className={classes.item}>
      <div className={classes.description}>
        <span>
          <strong>Title: </strong> {product.title}
        </span>
        <span>
          <strong>Price: </strong>
          {product.price}
        </span>
        <span>
          <strong>Description: </strong>
          {product.description}
        </span>
      </div>
      <div className={classes.quantity}>
        <button
          onClick={() => removeProductFromCart(product)}
          className={classes.remove}
        >
          -1
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={() => addProductToCart(product)}
          className={classes.add}
        >
          +1
        </button>
      </div>
    </div>
  );
};
