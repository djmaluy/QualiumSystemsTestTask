import React from "react";
import classes from "./EditView.module.css";

class EditView extends React.Component {
  constructor(props) {
    super(props);
    const { id, title, price, description } = props.location.state.product;
    this.state = {
      id,
      title,
      price,
      description,
    };
  }

  editProduct = (e) => {
    e.preventDefault();
    if (
      this.state.title === "" ||
      this.state.price === "" ||
      this.state.description === ""
    ) {
      alert("ALl the fields are required!");
      return;
    }
    this.props.updateProductHandler(this.state);
    this.setState({
      title: "",
      price: "",
      description: "",
    });
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <form onSubmit={this.editProduct} className={classes.editForm}>
          <h2>Update product</h2>
          <ul>
            <li>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                name="title"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </li>
            <li>
              <label htmlFor="price">Price: </label>
              <input
                id="price"
                type="number"
                name="price"
                value={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
              />
            </li>
            <li>
              <label htmlFor="description">Description: </label>
              <input
                id="description"
                type="text"
                name="description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </li>
            <li>
              <button className={classes.editButton}>Update</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
export default EditView;
