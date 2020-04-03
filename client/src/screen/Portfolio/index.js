import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useMediaQuery,
  Typography,
} from '@material-ui/core';
import Heading from '../../components/Heading';
import PortfolioChart from '../../components/portfolio-chart';
import PortfolioItemChart from '../../components/portfolio-item-chart';
import { APIGet } from '../../api/api';

function InvestmentAmount(props) {
  const data = {
    totalValue: '$19,658.12',
  };

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    typography: {
      marginTop: '4%',
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.typography}>
        Investing
      </Typography>
      <Typography variant="h5" className={classes.typography}>
        {data.totalValue}
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
  const data = {
    pendingReviewList: [
      { id: 1, name: 'Amazing Spider-Man (1963) #121', amount: '16' },
      { id: 2, name: 'Spawn (1992) #1', amount: '7' },
      { id: 3, name: 'Uncanny X-Men (1963) #266', amount: '5' },
    ],
  };

  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Pending Review</Typography>} />
          </ListItem>
          {data.pendingReviewList.map(item => {
            return (
              <React.Fragment key={item.id}>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary={<Typography variant="body1">{item.name}</Typography>}
                    secondary={<Typography variant="body1">{item.amount}</Typography>}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

function HighestValue(props) {
  const data = {
    highestValueList: [
      { id: 1, name: 'Incredible Hulk (1963) #181 (1.0)', amount: '$750.33' },
      { id: 2, name: 'Avengers Annual (1963) #10 (9.8)', amount: '$650.25' },
      { id: 3, name: 'Amazing Spider-Man (1963) #121', amount: '$500.15' },
    ],
  };
  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Highest Value</Typography>} />
          </ListItem>
          {data.highestValueList.map(item => {
            return (
              <React.Fragment key={item.id}>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary={<Typography variant="body1">{item.name}</Typography>}
                    secondary={<Typography variant="body1">{item.amount}</Typography>}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

function PortfolioHeader(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5">Portfolio</Typography>
      <Button variant="contained" href="/addcomic">
        ADD
      </Button>
    </div>
  );
}

function PortfolioListItem(props) {
  const { data } = props;
  const dispatch = useDispatch();

  const handleListItemClick = () => {
    dispatch(push(`/comic/${data.copies.join('-')}`));
  };

  return (
    <ListItem button onClick={event => handleListItemClick(event, 0)}>
      <div style={{ height: '75px', width: '40%' }}>
        <PortfolioItemChart />
      </div>
      <div style={{ marginLeft: '20px' }}>
        <Typography variant="body1">{data.name}</Typography>
        <Typography variant="body1">{data.value || '$55.55'}</Typography>
        <Typography variant="body1">
          {data.copies.length > 1 ? `${data.copies.length} Copies` : `${data.copies.length} Copy`}
        </Typography>
      </div>
    </ListItem>
  );
}

function PortfolioList(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await APIGet('inventory/portfolio');
        setData(response);
      } catch (error) {
        dispatch(push('/login'));
      }
    };
    fetchPortfolio();
  }, []);

  // const data = {
  //   portfolioList: [
  //     { name: 'Incredible Hulk (1963) #181 (1.0)', value: '$750.33', copies: 8 },
  //     { name: 'Avengers Annual (1963) #10 (9.8)', value: '$650.25', copies: 3 },
  //     { name: 'Amazing Spider-Man (1963) #121', value: '$500.15', copies: 2 },
  //     { name: 'X-Men (1963) #1', value: '$10,452.21', copies: 1 },
  //     { name: 'Daredevil (1963) #1', value: '$5,452.21', copies: 1 },
  //     { name: 'Amazing Spider-Man (1963) #50', value: '$452.21', copies: 1 },
  //     { name: 'Fantastic Four (1963) #52', value: '$662.21', copies: 12 },
  //   ],
  // };

  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          {data.map(item => (
            <React.Fragment key={item.name}>
              <PortfolioListItem data={item} />
              <Divider />
            </React.Fragment>
          ))}
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
