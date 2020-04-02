import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import PortfolioChart from '../../components/portfolio-chart';
import Divider from '@material-ui/core/Divider';
import ASM from '../../content/730623.jpg';
import Heading from '../../components/Heading';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useParams } from 'react-router-dom';
import { APIGet } from '../../api/api';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ComicTitle(props) {
  return (
    <Typography variant="h6">{`${props.data[0].comic.series.name} (${props.data[0].comic.series.year_began}) #${props.data[0].comic.number}`}</Typography>
  );
}

function ComicImage(props) {
  return <img width="150" height="225px" src={ASM} />;
}

function ComicDescription(props) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Copies</Typography>
        <Typography variant="body1">{props.data.length}</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Average Cost</Typography>
        <Typography variant="body1">
          {`$${props.data.reduce((prev, curr) => (prev += parseInt(curr.cost.split('$')[1])), 0).toFixed(2)}`}
        </Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="primary">
          Total Return
        </Typography>
        <Typography variant="body1" color="primary">
          +$600.00 (+17.51%)
        </Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="primary">
          Total Value
        </Typography>
        <Typography variant="body1" color="primary">
          $1,300.00
        </Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="primary">
          Portfolio Diversity
        </Typography>
        <Typography variant="body1" color="primary">
          22%
        </Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="primary">
          30 Day Return
        </Typography>
        <Typography variant="body1" color="primary">
          +100.00 (+4.22%)
        </Typography>
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

function ComicListItem(props) {
  return (
    <Card style={{ marginBottom: '5%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" color="primary" href={`/approval/${props.data.id}`}>
            Waiting Review: ??
          </Button>
        </div>
        <div style={{ display: 'flex', marginTop: '2%' }}>
          <img width="200" height="302px" src={`data:image/jpeg;base64,${props.data.cover.small}`} />
          <div style={{ marginLeft: '25px', width: '50%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Grade: </Typography>
              <Typography variant="body1">{`${props.data.condition.numerical} ${props.data.condition.name}`}</Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Cost</Typography>
              <Typography variant="body1">{props.data.cost}</Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Acquired</Typography>
              <Typography variant="body1">{props.data.acquired}</Typography>
            </div>

            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" color="primary">
                52 WK high
              </Typography>
              <Typography variant="body1" color="primary">
                $75.21 (12/12/2019)
              </Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" color="primary">
                Value (30 d)
              </Typography>
              <Typography variant="body1" color="primary">
                $300.99
              </Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" color="primary">
                52 WK Low
              </Typography>
              <Typography variant="body1" color="primary">
                $50.75 (02/14/2018)
              </Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" color="primary">
                Approved
              </Typography>
              <Typography variant="body1" color="primary">
                30
              </Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" color="primary">
                Last Price
              </Typography>
              <Typography variant="body1" color="primary">
                $60.00 (03/10/20)
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ComicList(props) {
  return props.data.map(x => <ComicListItem data={x} />);
}

export default function Comic(props) {
  const matches = useMediaQuery('(max-resolution: 1dppx)');
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchComic = async () => {
      const response = await APIGet('inventory/comic', { list: id.split('-') });
      setData(response);
    };
    fetchComic();
  }, []);

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
            {data.length > 0 ? <ComicTitle data={data} /> : null}
            <div>
              <div
                style={{
                  marginTop: '4%',
                  display: matches ? 'flex' : null,
                  justifyContent: matches ? 'flex-start' : null,
                }}
              >
                {/* <div style={{ width: matches ? '250px' : null }}>
                  <ComicImage />
                </div> */}
                <div style={{ width: matches ? '49%' : null }}>
                  <ComicDescription data={data} />
                </div>
              </div>
              <InvestmentChart matches={matches} />
            </div>
          </div>

          <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
            <div style={{ width: '100%', maxHeight: matches ? '80vh' : null, overflow: matches ? 'auto' : null }}>
              <ComicList data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
