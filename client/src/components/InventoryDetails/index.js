import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PendingApprovals from '../Approval/PendingApprovals';
import CompletedApprovals from '../Approval/CompletedApprovals';

export default function InventoryDetails(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const title =
    props.data.issue.series.name + ' (' + props.data.issue.series.volume + ') ' + props.data.issue.issueNumber;

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Details
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div style={{ display: 'flex' }}>
            <PendingApprovals data={props.data} />
            <CompletedApprovals data={props.data} />
          </div>
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
