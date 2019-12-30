import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
      // <table>
      //   <thead>
      //     <tr>
      //       <th>Bin</th>
      //       <th>Tag</th>
      //       <th>Series</th>
      //       <th>Volume</th>
      //       <th>Issue</th>
      //       <th>Notes</th>
      //       <th>Cost</th>
      //       <th>Aquired</th>
      //       <th>Vendor</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {this.props.inventory.map((item, i) => (
      //       <tr key={i}>
      //         <td>{item.bin}</td>
      //         <td>{item.tag}</td>
      //         <td>{item.comic.series}</td>
      //         <td>{item.comic.volume}</td>
      //         <td>{item.comic.issue}</td>
      //         <td>{item.notes}</td>
      //         <td>{item.cost}</td>
      //         <td>{item.aquired.split("T")[0]}</td>
      //         <td>{item.vendor.name}</td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Bin</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Series</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Issue</TableCell>
              <TableCell align="right">notes</TableCell>
              <TableCell align="right">cost</TableCell>
              <TableCell align="right">Aquired</TableCell>
              <TableCell align="right">Vendor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.inventory.map(row => (
              <TableRow key={row.id}>
                <TableCell align="right">{row.bin}</TableCell>
                <TableCell align="right">{row.tag}</TableCell>
                <TableCell align="right">{row.comic.series}</TableCell>
                <TableCell align="right">{row.comic.volume}</TableCell>
                <TableCell align="right">{row.comic.issue}</TableCell>
                <TableCell align="right">{row.notes}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                <TableCell align="right">{row.aquired.split("T")[0]}</TableCell>
                <TableCell align="right">{row.vendor.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default GetInventory;
