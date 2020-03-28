import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import PortfolioChart from '../../components/portfolio-chart';
import Divider from '@material-ui/core/Divider';
import ASM from '../../content/730623.jpg';
import Heading from '../../components/Heading';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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

function InvestmentChart(props) {
  return (
    <Card
      style={{
        marginTop: '4%',
      }}
    >
      <CardContent>
        <div style={{ height: '30vh' }}>
          <PortfolioChart />
        </div>
      </CardContent>
    </Card>
  );
}

function ComicListItem() {
  return (
    <Card style={{ marginBottom: '5%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained">Waiting Review: 7</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">Grade: </Typography>
          <Typography variant="body1">3.0 VG</Typography>
        </div>
        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">Cost</Typography>
          <Typography variant="body1">$100.00</Typography>
        </div>
        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">Acquired</Typography>
          <Typography variant="body1">06/06/2014</Typography>
        </div>

        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">52 WK high</Typography>
          <Typography variant="body1">$75.21 (12/12/2019)</Typography>
        </div>
        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">Value (30 d)</Typography>
          <Typography variant="body1">$300.99</Typography>
        </div>
        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">52 WK Low</Typography>
          <Typography variant="body1">$50.75 (02/14/2018)</Typography>
        </div>
        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">Approved</Typography>
          <Typography variant="body1">30</Typography>
        </div>
        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">Last Price</Typography>
          <Typography variant="body1">$60.00 (03/10/20)</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

function ComicList() {
  return (
    <div>
      <ComicListItem />
      <ComicListItem />
      <ComicListItem />
      <ComicListItem />
      <ComicListItem />
      <ComicListItem />
      <ComicListItem />
    </div>
  );
}

export default function Comic(props) {
  const matches = useMediaQuery('(max-resolution: 1dppx)');

  return (
    <div>
      <Heading />

      <div
        style={{
          marginLeft: matches ? '4%' : '10%',
          marginRight: matches ? '4%' : '10%',
        }}
      >
        <div
          style={{
            display: matches ? 'flex' : null,
            justifyContent: matches ? 'space-between' : null,
          }}
        >
          <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
            <ComicTitle />
            <div>
              <div
                style={{
                  marginTop: '4%',
                  display: matches ? 'flex' : null,
                  justifyContent: matches ? 'flex-start' : null,
                }}
              >
                <div style={{ width: matches ? '250px' : null }}>
                  <ComicImage />
                </div>
                <div style={{ width: matches ? '49%' : null }}>
                  <ComicDescription />
                </div>
              </div>
              <InvestmentChart matches={matches} />
            </div>
          </div>

          <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
            <div style={{ width: '100%', maxHeight: matches ? '80vh' : null, overflow: matches ? 'auto' : null }}>
              <ComicList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
