import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Vendor from './components/vendor';
import Page from './components/page';
import Condition from './components/condition';
import Grader from './components/grader';
import Acquired from './components/acquired';
import Cost from './components/cost';
import Notes from './components/notes';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const [comic, setComic] = React.useState({});
  const dispatch = useDispatch();

  const handleChange = (name) => (data) => {
    let c = comic;
    c[name] = data;
    setComic(c);
  };

  const handleClickOpen = () => {
    setComic({ comicId: props.data.issueId });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.submitComic(comic);
    setOpenConfirm(true);
  };

  const handleContinue = () => {
    setOpen(false);
    setOpenConfirm(false);
  };

  const handleRoute = () => {
    dispatch(push('/'));
    setOpen(false);
    setOpenConfirm(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Select
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {`${props.data.seriesName} (${props.data.yearBegan}) #${props.data.issueNumber}`}
        </DialogTitle>
        <DialogContent>
          <img width="100" alt="" height="151px" src={`data:image/jpeg;base64,${props.data.coverSmall.small}`} />
          <DialogContentText>Fill out the form to create a new item in your inventory</DialogContentText>
          <Condition handleChange={handleChange} />
          <Page handleChange={handleChange} />
          <Grader handleChange={handleChange} />
          <Cost handleChange={handleChange} />
          <Acquired handleChange={handleChange} />
          <Vendor handleChange={handleChange} />
          <Notes handleChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Success!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Add another?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinue} color="primary">
            ok
          </Button>
          <Button href="/" color="primary" autoFocus>
            exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
