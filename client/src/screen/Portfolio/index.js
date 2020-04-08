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
import PortfolioChart from './components/portfolio-chart';
import PortfolioItemChart from './components/portfolio-item-chart';
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
          <PortfolioChart data={props.data} />
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

  const title = `${data.comic.seriesName} (${data.comic.volume}) #${data.comic.number} `;

  const handleListItemClick = () => {
    history.push(`/comic/${data.comic.issueId}`);
  };

  return (
    <ListItem button onClick={(event) => handleListItemClick(event, 0)}>
      <div style={{ height: '75px', width: '40%' }}>
        <PortfolioItemChart data={data.inventory.validTransactions} />
      </div>
      <div style={{ marginLeft: '20px' }}>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body1">Cost: {data.inventory.amount}</Typography>
        <Typography variant="body1">Value: {data.inventory.value}</Typography>
      </div>
    </ListItem>
  );
}

const Portfolio = ({ history }) => {
  const matches = useMediaQuery('(max-resolution: 1dppx)');
  const [data, setData] = useState({
    portfolio: [],
    portfolioChart: {
      cost: [],
      value: [],
    },
    topThreeValue: [],
    topThreePending: [],
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await APIGet('portfolio');
        console.log(response);
        if (!response) history.push('/login');
        setData(response);
        console.log(data);
      } catch (error) {
        history.push('/login');
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div>
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
          <InvestmentChart matches={matches} data={data.portfolioChart} />
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
              <PendingReview matches data={data.topThreePending} />
            </div>
            <div
              style={{
                marginTop: '4%',
                width: matches ? '48%' : '100%',
              }}
            >
              <HighestValue matches data={data.topThreeValue} />
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
                  {data.portfolio.map((item, i) => (
                    <React.Fragment key={i}>
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
