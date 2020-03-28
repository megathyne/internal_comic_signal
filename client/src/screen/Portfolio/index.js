import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, AppBar } from '@material-ui/core';
import PortfolioChart from '../../components/portfolio-chart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PortfolioItemChart from '../../components/portfolio-item-chart';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Heading from '../../components/Heading';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
  },
  appbarRoot: {
    flexGrow: 1,
  },
  appbar: {
    colorPrimary: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function InvestmentAmount(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <Typography variant="h5" style={{ marginTop: '4%' }}>
        Investing
      </Typography>
      <Typography variant="h5" style={{ marginTop: '4%' }}>
        $19,658.12
      </Typography>
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

function PendingReview(props) {
  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Pending Review</Typography>} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary={<Typography variant="body1">Amazing Spider-Man (1963) #121</Typography>}
              secondary={<Typography variant="body1">16</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary={<Typography variant="body1">Spawn (1992) #1</Typography>}
              secondary={<Typography variant="body1">7</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary={<Typography variant="body1">Uncanny X-Men (1963) #266</Typography>}
              secondary={<Typography variant="body1">5</Typography>}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

function HighestValue(props) {
  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Highest Value</Typography>} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary={<Typography variant="body1">Incredible Hulk (1963) #181 (1.0)</Typography>}
              secondary={<Typography variant="body1">$750.33</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary={<Typography variant="body1">Avengers Annual (1963) #10 (9.8)</Typography>}
              secondary={<Typography variant="body1">$650.25</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary={<Typography variant="body1">Amazing Spider-Man (1963) #121</Typography>}
              secondary={<Typography variant="body1">$500.15</Typography>}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

function PortfolioHeader(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5">Portfolio</Typography>
      <Button variant="contained">ADD</Button>
    </div>
  );
}

function PortfolioListItem(props) {
  return (
    <ListItem button>
      <div style={{ height: '75px', width: '40%' }}>
        <PortfolioItemChart />
      </div>
      <div style={{ marginLeft: '20px' }}>
        <Typography variant="body1">INCREDIBLE HULK (1963) #181 (1.0)</Typography>
        <Typography variant="body1">$750.33</Typography>
        <Typography variant="body1">8 COPIES</Typography>
      </div>
    </ListItem>
  );
}

function PortfolioList(props) {
  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
          <PortfolioListItem />
          <Divider />
        </List>
      </CardContent>
    </Card>
  );
}

export default function Portfolio(props) {
  const matches = useMediaQuery('(max-resolution: 1dppx)');

  return (
    <div>
      <Heading />
      <div
        style={{
          marginLeft: matches ? '4%' : '10%',
          marginRight: matches ? '4%' : '10%',
          marginTop: '4%',
          display: matches ? 'flex' : null,
          justifyContent: matches ? 'space-between' : null,
        }}
      >
        <div
          style={{
            width: matches ? '48%' : null,
          }}
        >
          <InvestmentAmount />
          <InvestmentChart matches={matches} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                marginTop: '4%',
                width: matches ? '48%' : '100%',
              }}
            >
              <PendingReview matches />
            </div>
            <div
              style={{
                marginTop: '4%',
                width: matches ? '48%' : '100%',
              }}
            >
              <HighestValue matches />
            </div>
          </div>
        </div>

        <div
          style={{
            width: matches ? '48%' : null,
          }}
        >
          <div style={{ marginTop: '4%' }}>
            <PortfolioHeader />
          </div>
          <div style={{ marginTop: '4%', maxHeight: matches ? '80vh' : null, overflow: matches ? 'auto' : null }}>
            <PortfolioList />
          </div>
        </div>
      </div>
    </div>
  );
}
