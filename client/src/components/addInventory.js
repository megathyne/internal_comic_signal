import React from "react";

class AddInventory extends React.Component {
  state = {
    bin: null,
    comic: null,
    quantity: null
  };

  handleSubmit = async () => {
    const { bin, comic, quantity } = this.state;
    try {
      const response = await fetch("http://localhost:3000/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ bin, comic, quantity })
      });
      if (response.status === 201) {
        this.props.updateInventory(this.state);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    return (
      <div>
        <p>bin</p>
        <input onChange={this.handleChange("bin")} />
        <p>comic</p>
        <input onChange={this.handleChange("comic")} />
        <p>quantity</p>
        <input onChange={this.handleChange("quantity")} />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default AddInventory;
