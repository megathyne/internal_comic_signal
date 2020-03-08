import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { APIGet } from '../../api/api';
import CompletedApprovalItem from './CompletedApprovalItem';

export default function CompletedApprovals(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({ completedApprovals: [], isFetching: false });

  const fetchCompletedApprovals = async () => {
    try {
      setData({ completedApprovals: data.completedApprovals, isFetching: true });
      const response = await APIGet(`approval`);
      setData({ completedApprovals: response, isFetching: false });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = async () => {
    await fetchCompletedApprovals();
    setOpen(true);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Completed Transactions
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Transactions that have been processed</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {/* {data.completedApprovals.map((item, i) => (
              <CompletedApprovalItem key={i} data={{ ...item, inventoryId: props.data.id }} />
            ))} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
