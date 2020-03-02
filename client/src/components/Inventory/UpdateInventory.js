import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { APIPatch } from '../../api/api';

export default function UpdateInventory(props) {
  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    bin: props.data.bin,
    tag: props.data.tag,
    notes: props.data.notes,
    cost: props.data.cost,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const updateInventory = async item => {
    try {
      const results = await APIPatch('inventory/' + item.id, item);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setState({
      id: props.data.id,
      bin: props.data.bin,
      tag: props.data.tag,
      notes: props.data.notes,
      cost: props.data.cost,
    });
    setOpen(true);
  };

  const handleClose = () => {
    updateInventory({ ...state });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div
            style={{
              display: 'flex',
              marginBottom: '20px',
              justifyContent: 'space-around',
            }}
          >
            <TextField
              disabled
              id="current-bin"
              label="Current Bin"
              variant="outlined"
              value={props.data.bin}
              fullWidth
            />
            <TextField
              id="new-bin"
              label="New Bin"
              variant="outlined"
              name="bin"
              value={state.bin}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div
            style={{
              display: 'flex',
              marginBottom: '20px',
              justifyContent: 'space-around',
            }}
          >
            <TextField
              disabled
              id="current-tag"
              label="Current Tag"
              variant="outlined"
              value={props.data.tag}
              fullWidth
            />
            <TextField
              id="new-tag"
              label="New Tag"
              variant="outlined"
              name="tag"
              value={state.tag}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div
            style={{
              display: 'flex',
              marginBottom: '20px',
              justifyContent: 'space-around',
            }}
          >
            <TextField
              disabled
              id="current-note"
              label="Current Notes"
              variant="outlined"
              value={props.data.notes}
              fullWidth
            />
            <TextField
              id="new-note"
              label="New Notes"
              variant="outlined"
              name="notes"
              value={state.notes}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div
            style={{
              display: 'flex',
              marginBottom: '20px',
              justifyContent: 'space-around',
            }}
          >
            <TextField
              disabled
              id="current-cost"
              label="Current Cost"
              variant="outlined"
              value={props.data.cost}
              fullWidth
            />
            <TextField
              id="new-cost"
              label="New Cost"
              variant="outlined"
              name="cost"
              value={state.cost}
              onChange={handleChange}
              fullWidth
            />
          </div>
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
