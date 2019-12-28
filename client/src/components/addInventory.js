import React from "react";
import { APIPost } from "../api/api";
class AddInventory extends React.Component {
  state = {};

  handleSubmit = async () => {
    const { bin, tag, notes, cost, aquired } = this.state;
    const { activeComic } = this.props;

    try {
      await APIPost("inventory", {
        bin,
        tag,
        notes,
        cost,
        aquired,
        comicId: activeComic
      });
      this.props.updateInventory();
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
        <div>
          <p>bin</p>
          <input onChange={this.handleChange("bin")} />
        </div>
        <div>
          <p>tag</p>
          <input onChange={this.handleChange("tag")} />
        </div>
        <div>
          <p>notes</p>
          <input onChange={this.handleChange("notes")} />
        </div>
        <div>
          <p>cost</p>
          <input onChange={this.handleChange("cost")} />
        </div>
        <div>
          <p>aquired</p>
          <input onChange={this.handleChange("aquired")} />
        </div>
        <div>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default AddInventory;
