import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { APIGet, APIPost } from '../../api/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // height: 700,
  },
}));

function ComicTitle(props) {
  return (
    <Typography variant="h6">
      {`${props.data.series.name} (${props.data.series.year_began}) #${props.data.number}`}
    </Typography>
  );
}

function ComicImage(props) {
  return <img alt="" width="200" height="302px" src={`data:image/jpeg;base64,${props.data.small}`} />;
}

function ComicDescription(props) {
  const { inventory } = props.data;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Condition</Typography>
        <Typography variant="body1">{inventory.condition.numerical}</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Page</Typography>
        <Typography variant="body1">{inventory.page.name}</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Grader</Typography>
        <Typography variant="body1">{inventory.grader.name}</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Cost</Typography>
        <Typography variant="body1">{inventory.cost}</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Acquired</Typography>
        <Typography variant="body1">{inventory.acquired}</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Vendor</Typography>
        <Typography variant="body1">{inventory.vendor.name}</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Notes</Typography>
        <Typography variant="body1">{inventory.notes}</Typography>
      </div>
    </div>
  );
}

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <img src={props.selectedValue} />
    </Dialog>
  );
}

function EbayListItem(props) {
  const { data } = props;
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState();

  const handleApprove = () => {
    props.handleSetApproval(data.itemId, true);
  };

  const handleReject = () => {
    props.handleSetApproval(data.itemId, false);
  };

  const IMAGES = data.details.PictureURL;
  // console.log(IMAGES);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (position) => {
    setSelectedValue(IMAGES[position]);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div style={{ width: '75%' }}>
      <SimpleDialog open={open} selectedValue={selectedValue} onClose={handleClose} />
      <Card style={{ marginBottom: '5%' }}>
        <CardContent>
          <div>
            <Carousel showThumbs={false} onClickItem={handleClickOpen}>
              {IMAGES.map((x) => (
                <div>
                  <img src={x} />
                </div>
              ))}
            </Carousel>
            <div style={{ marginTop: '10px', minWidth: '250px' }}>
              <Typography variant="body1">{data.title}</Typography>

              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Typography variant="body1">End Date</Typography>
                <Typography variant="body1">{data.details.EndTime.split('T')[0]}</Typography>
              </div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Typography variant="body1">Type</Typography>
                <Typography variant="body1">{data.listingType}</Typography>
              </div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Typography variant="body1">Bids</Typography>
                <Typography variant="body1">30</Typography>
              </div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">{data.shippingCost}</Typography>
              </div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Typography variant="body1">Sold</Typography>
                <Typography variant="body1">{data.finalPrice}</Typography>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4%' }}>
              <Button variant="contained" onClick={handleReject}>
                Reject
              </Button>
              <Button variant="contained" onClick={handleApprove}>
                Approve
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EbayList(props) {
  return (
    <div style={{ width: '95%' }}>
      {props.data.map((x) => (
        <EbayListItem key={x.id} handleSetApproval={props.handleSetApproval} data={x} />
      ))}
    </div>
  );
}

export default function Approval(props) {
  const matches = useMediaQuery('(max-resolution: 1dppx)');
  const { inventoryId } = useParams();
  const [data, setData] = useState({
    inventory: {
      condition: {},
      page: {},
      grader: {},
      vendor: {},
    },
    comic: {
      series: {},
    },
    cover: {
      small: '',
    },
    pendingApprovals: [],
  });

  useEffect(() => {
    const fetchApproval = async () => {
      const response = await APIGet('approval/pending/' + inventoryId);
      console.log(response);
      setData(response);
    };
    fetchApproval();
  }, []);

  const handleSetApproval = async (ebayItemId, isApproved) => {
    const dto = {
      inventoryId: inventoryId,
      ebayItemId: ebayItemId,
      isApproved: isApproved,
    };
    await APIPost('approval', dto);
    let d = data;
    d.pendingApprovals = data.pendingApprovals.filter((x) => x.itemId !== ebayItemId);
    setData(d);
  };

  return (
    <div>
      <div style={{ marginLeft: matches ? '4%' : '10%', marginRight: matches ? '4%' : '10%' }}>
        <EbayList data={data.pendingApprovals} handleSetApproval={handleSetApproval} />

        {/* <div style={{ display: matches ? 'flex' : null, justifyContent: matches ? 'space-between' : null }}>
          <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
            <ComicTitle data={data.comic} />

            <div
              style={{
                marginTop: '4%',
                display: matches ? 'flex' : null,
                justifyContent: matches ? 'flex-start' : null,
              }}
            >
              <div style={{ width: matches ? '250px' : null }}>
                <ComicImage data={data.cover} />
              </div>
              <div style={{ width: matches ? '49%' : null }}>
                <ComicDescription data={data} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                maxHeight: matches ? '80vh' : null,
                overflow: matches ? 'auto' : null,
              }}
            >
              <EbayList data={data.pendingApprovals} handleSetApproval={handleSetApproval} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
