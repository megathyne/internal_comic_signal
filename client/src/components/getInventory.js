import React from "react";
import { APIGet } from "../api/api";
class GetInventory extends React.Component {
  componentDidMount = async () => {
    try {
      const results = await APIGet("inventory");
      this.props.setInventory(results);
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
            <th>Tag</th>
            <th>Series</th>
            <th>Volume</th>
            <th>Issue</th>
            <th>Notes</th>
            <th>Cost</th>
            <th>Aquired</th>
          </tr>
        </thead>
        <tbody>
          {this.props.inventory.map((item, i) => (
            <tr key={i}>
              <td>{item.bin}</td>
              <td>{item.tag}</td>
              <td>{item.comic.series}</td>
              <td>{item.comic.volume}</td>
              <td>{item.comic.issue}</td>
              <td>{item.notes}</td>
              <td>{item.cost}</td>
              <td>{item.aquired.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default GetInventory;
