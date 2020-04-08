import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Card, CardContent, Divider, Paper, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import ASM from '../../mockData/730623.jpg';

// import ebay1 from './s-l1600.jpg';
// import ebay2 from './s-l1600 (1).jpg';

// const tileData = [
//   {
//     img: ebay1,
//     title: 'Image',
//     author: 'author',
//     cols: 1,
//   },
//   {
//     img: ebay2,
//     title: 'Image',
//     author: 'author',
//     cols: 1,
//   },
//   {
//     img: ebay1,
//     title: 'Image',
//     author: 'author',
//     cols: 1,
//   },
//   {
//     img: ebay2,
//     title: 'Image',
//     author: 'author',
//     cols: 1,
//   },
// ];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 275,
  },
}));

function ComicTitle(props) {
  return <Typography variant="h6">Amazing Spider-Man (1963) #121</Typography>;
}

function ComicImage(props) {
  return <img width="150" height="225px" src={ASM} />;
}

function ComicDescription(props) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Copies</Typography>
        <Typography variant="body1">3</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Average Cost</Typography>
        <Typography variant="body1">$175.54</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Total Return</Typography>
        <Typography variant="body1">+$600.00 (+17.51%)</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Total Value</Typography>
        <Typography variant="body1">$1,300.00</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Portfolio Diversity</Typography>
        <Typography variant="body1">22%</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">30 Day Return</Typography>
        <Typography variant="body1">+100.00 (+4.22%)</Typography>
      </div>
    </div>
  );
}

function ApprovalItem() {
  const classes = useStyles();
  return (
    <Card style={{ marginBottom: '5%' }}>
      <CardContent>
        <Typography variant="subtitle2">
          The Amazing Spider-Man 121 ~~~ CGC 7.5 ~~~ "Death" of Gwen Stacy ~ Off-White Page
        </Typography>

        {/* <div className={classes.root}>
          <GridList className={classes.gridList} cols={4}>
            {tileData.map(tile => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div> */}

        <div style={{ marginTop: '10px', minWidth: '250px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography variant="body1">Total</Typography>
            <Typography variant="body1">$300.15 (+12%)</Typography>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography variant="body1">End Date</Typography>
            <Typography variant="body1">12/12/2019</Typography>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography variant="body1">Type</Typography>
            <Typography variant="body1">Auction</Typography>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography variant="body1">Bids</Typography>
            <Typography variant="body1">30</Typography>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography variant="body1">Shipping</Typography>
            <Typography variant="body1">$12.95</Typography>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography variant="body1">Sold</Typography>
            <Typography variant="body1">$2000,00</Typography>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4%' }}>
          <Button variant="contained">Reject</Button>
          <Button variant="contained">Approve</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ApprovalList() {
  return (
    <div style={{ width: '95%' }}>
      <ApprovalItem />
      <ApprovalItem />
      <ApprovalItem />
      <ApprovalItem />
      <ApprovalItem />
    </div>
  );
}

export default function ApprovalHistory(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const matches = useMediaQuery('(max-resolution: 1dppx)');

  return (
    <div>
      <div style={{ marginLeft: matches ? '4%' : '10%', marginRight: matches ? '4%' : '10%' }}>
        <div style={{ display: matches ? 'flex' : null, justifyContent: matches ? 'space-between' : null }}>
          <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
            <ComicTitle />

            <div
              style={{
                marginTop: '4%',
              }}
            >
              <div style={{ width: matches ? '250px' : null }}>
                <ComicImage />
              </div>
              <div style={{ width: matches ? '49%' : null }}>
                <ComicDescription />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
            <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="Approved" />
                <Tab label="Rejected" />
              </Tabs>
            </Paper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '5%',
                maxHeight: matches ? '80vh' : null,
                overflow: matches ? 'auto' : null,
              }}
            >
              <ApprovalList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
