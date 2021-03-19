import React from "react";
import classes from "../editView/EditView.module.css";

class CreateView extends React.Component {
  state = {
    title: "",
    price: "",
    description: "",
  };

  addProduct = (e) => {
    e.preventDefault();
    if (
      this.state.title === "" ||
      this.state.price === "" ||
      this.state.description === ""
    ) {
      alert("ALl the fields are required!");
      return;
    }
    this.props.addProductHandler(this.state);
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
        <form onSubmit={this.addProduct} className={classes.editForm}>
          <h2>Add product</h2>
          <ul>
            <li>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </li>
            <li>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
              />
            </li>
            <li>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </li>
            <li>
              <button className={classes.editButton}>Save</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
export default CreateView;
