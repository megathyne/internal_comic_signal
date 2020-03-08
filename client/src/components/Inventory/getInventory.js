import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getInventorySaga } from '../../actions';
import UpdateInventory from './UpdateInventory';
import PendingApprovals from '../Approval/PendingApprovals';
import CompletedApprovals from '../Approval/CompletedApprovals';

export default function GetInventory(props) {
  const dispatch = useDispatch();
  const { inventory } = useSelector(state => ({
    inventory: state.addInventory.inventory,
  }));

  useEffect(() => {
    const fetchGraders = async () => {
      try {
        dispatch(getInventorySaga());
      } catch (e) {
        console.log(e);
      }
    };
    fetchGraders();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Bin</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Series</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Issue</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Condition</TableCell>
              <TableCell align="right">Grader</TableCell>
              <TableCell align="right">pages</TableCell>
              <TableCell align="right">Acquired</TableCell>
              <TableCell align="right">Vendor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map(row => (
              <TableRow key={row.id}>
                <TableCell align="right">{row.bin}</TableCell>
                <TableCell align="right">{row.tag}</TableCell>
                <TableCell align="right">{row.issue.series.name}</TableCell>
                <TableCell align="right">{row.issue.series.volume}</TableCell>
                <TableCell align="right">{row.issue.issueNumber}</TableCell>
                <TableCell align="right">{row.notes}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                <TableCell align="right">{row.condition.abbreviation}</TableCell>
                <TableCell align="right">{row.grader.name}</TableCell>
                <TableCell align="right">{row.page.name}</TableCell>
                <TableCell align="right">{row.acquired.split('T')[0]}</TableCell>
                <TableCell align="right">{row.vendor ? row.vendor.name : ''}</TableCell>
                <TableCell align="right">
                  <UpdateInventory data={row} />
                </TableCell>
                <TableCell align="right">
                  <PendingApprovals data={row} />
                </TableCell>
                <TableCell align="right">
                  <CompletedApprovals data={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
