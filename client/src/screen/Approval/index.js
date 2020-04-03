import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ebay1 from '../../mockData/s-l1600.jpg';
import ebay2 from '../../mockData/s-l1600 (1).jpg';
import Heading from '../../components/Heading';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useParams } from 'react-router-dom';
import { APIGet, APIPost } from '../../api/api';

const tileData = [
  {
    img: ebay1,
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: ebay2,
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: ebay1,
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: ebay2,
    title: 'Image',
    author: 'author',
    cols: 1,
  },
];

const useStyles = makeStyles(theme => ({
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

function EbayListItem(props) {
  const { data } = props;
  const classes = useStyles();

  const handleApprove = () => {
    props.handleSetApproval(data.itemId, true);
  };

  const handleReject = () => {
    props.handleSetApproval(data.itemId, false);
  };

  return (
    <GridList>
      {data.details.PictureURL.map(url => (
        <img src={url} alt="" />
      ))}
    </GridList>
  );

  //   return (
  //     <Card style={{ marginBottom: '5%' }}>
  //       <CardContent>
  //         <Typography variant="subtitle2">{data.title}</Typography>
  //         <img alt="" src={data.galleryURL} />
  //         <div className={classes.root}>
  //           <GridList className={classes.gridList} cols={2}>
  //             {/* {tileData.map(tile => (
  //               <GridListTile key={tile.img} cols={tile.cols || 1}>
  //                 <img src={tile.img} alt={tile.title} />
  //               </GridListTile>
  //             ))} */}

  //             {data.details.PictureURL.map(tile => (
  //               <GridListTile key={tile} cols={tile.cols || 2}>
  //                 <img src={tile} alt="" />
  //               </GridListTile>
  //             ))}
  //           </GridList>
  //         </div>

  //         <div style={{ marginTop: '10px', minWidth: '250px' }}>
  //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
  //             <Typography variant="body1">Total</Typography>
  //             <Typography variant="body1">{data.totalCost}</Typography>
  //           </div>
  //           <Divider />
  //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
  //             <Typography variant="body1">End Date</Typography>
  //             <Typography variant="body1">12/12/2019</Typography>
  //           </div>
  //           <Divider />
  //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
  //             <Typography variant="body1">Type</Typography>
  //             <Typography variant="body1">{data.listingType}</Typography>
  //           </div>
  //           <Divider />
  //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
  //             <Typography variant="body1">Bids</Typography>
  //             <Typography variant="body1">30</Typography>
  //           </div>
  //           <Divider />
  //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
  //             <Typography variant="body1">Shipping</Typography>
  //             <Typography variant="body1">{data.shippingCost}</Typography>
  //           </div>
  //           <Divider />
  //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
  //             <Typography variant="body1">Sold</Typography>
  //             <Typography variant="body1">{data.finalPrice}</Typography>
  //           </div>
  //         </div>

  //         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4%' }}>
  //           <Button variant="contained" onClick={handleReject}>
  //             Reject
  //           </Button>
  //           <Button variant="contained" onClick={handleApprove}>
  //             Approve
  //           </Button>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
}

function EbayList(props) {
  return (
    <div style={{ width: '95%' }}>
      {props.data.map(x => (
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
    d.pendingApprovals = data.pendingApprovals.filter(x => x.itemId !== ebayItemId);
    setData(d);
  };

  return (
    <div>
      <Heading />
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
