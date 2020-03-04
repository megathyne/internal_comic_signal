import React, { useEffect, useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getPendingApprovalsSaga } from '../../actions';
import { useDispatch } from 'react-redux';
import { APIGet } from '../../api/api';
import PendingApprovalItem from './PendingApprovalItem';

export default function PendingApprovals(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({ pendingApprovals: [], isFetching: false });
  const dispatch = useDispatch();

  const fetchPendingApprovals = async () => {
    try {
      setData({ pendingApprovals: data.pendingApprovals, isFetching: true });
      const response = await APIGet(`approval/pending/${props.data.id}`);
      setData({ pendingApprovals: response, isFetching: false });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = async () => {
    await fetchPendingApprovals();
    setOpen(true);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Pending Transactions
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Transactions to approve</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {data.pendingApprovals.map((item, i) => (
            <PendingApprovalItem key={i} data={{ ...item, inventoryId: props.data.id }} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
