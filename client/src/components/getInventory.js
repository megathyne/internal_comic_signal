import React from "react";

class GetInventory extends React.Component {
  componentDidMount = async () => {
    try {
      const response = await fetch("http://localhost:3000/inventory", {
        get: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const results = await response.json();
      if (results.length > 0) {
        this.props.setInventory(results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Bin</th>
            <th>Comic</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.inventory.map(item => (
            <tr>
              <td>{item.bin}</td>
              <td>{item.comic.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default GetInventory;
