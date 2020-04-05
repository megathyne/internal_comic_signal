import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  makeStyles,
  useMediaQuery,
  Typography,
} from '@material-ui/core';
import Heading from '../../components/Heading';
import PortfolioChart from '../../components/portfolio-chart';
import PortfolioItemChart from '../../components/portfolio-item-chart';
import { APIGet } from '../../api/api';
import { withRouter } from 'react-router-dom';
import HighestValue from './components/highest-value';
import PendingReview from './components/pending-review';

function InvestmentAmount(props) {
  const data = {
    totalValue: '$19,658.12',
  };

  const useStyles = makeStyles((theme) => ({
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
  const { data, history } = props;

  const handleListItemClick = () => {
    history.push(`/comic/${data.copies.join('-')}`);
  };

  return (
    <ListItem button onClick={(event) => handleListItemClick(event, 0)}>
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

const Portfolio = ({ history }) => {
  const matches = useMediaQuery('(max-resolution: 1dppx)');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await APIGet('inventory/portfolio');
        if (!response) history.push('/login');
        setData(response);
      } catch (error) {
        history.push('/login');
      }
    };
    fetchPortfolio();
  }, []);

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
            <Card>
              <CardContent>
                <List component="nav" aria-label="secondary mailbox folders">
                  {data.map((item) => (
                    <React.Fragment key={item.name}>
                      <PortfolioListItem data={item} history={history} />
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Portfolio);
