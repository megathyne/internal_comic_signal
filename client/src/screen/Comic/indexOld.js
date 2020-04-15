import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Divider, useMediaQuery, Typography } from '@material-ui/core';
import PortfolioChart from '../../components/portfolio-chart';
import { useParams } from 'react-router-dom';
import { APIGet } from '../../api/api';
import Description from './components/description';
import ComicChart from './components/ComicChart';

function ComicTitle(props) {
  console.log('---------', props.data);
  return <Typography variant="h6">{props.data}</Typography>;
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
  console.log(props.data);
  const {
    comic,
    inventory: { id, condition, date, amount, validTransactionsCount, value, high, low, last, pendingApprovalCount },
  } = props.data;

  return (
    <Card style={{ marginBottom: '5%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" color="primary" href={`/approval/${id}`}>
            Waiting Review: {pendingApprovalCount}
          </Button>
        </div>
        <div style={{ display: 'flex', marginTop: '2%' }}>
          {/* <img alt="" width="200" height="302px" src={`data:image/jpeg;base64,${props.data.cover.small}`} /> */}
          <div style={{ marginLeft: '25px', width: '50%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Grade: </Typography>
              <Typography variant="body1">{condition}</Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Cost</Typography>
              <Typography variant="body1">{amount}</Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Acquired</Typography>
              <Typography variant="body1">{date}</Typography>
            </div>

            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">52 WK high</Typography>
              <Typography variant="body1">{`${high.finalPrice} (${high.endTime})`}</Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Value</Typography>
              <Typography variant="body1">{`$${value}`}</Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">52 WK Low</Typography>
              <Typography variant="body1">{`${low.finalPrice} (${low.endTime})`}</Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Approved</Typography>
              <Typography variant="body1">{validTransactionsCount}</Typography>
            </div>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Last Price</Typography>
              <Typography variant="body1">{`${last.finalPrice} (${last.endTime})`}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Comic(props) {
  const matches = useMediaQuery('(max-resolution: 1dppx)');
  const { issueId } = useParams();
  const [data, setData] = useState({
    meta: { title: '' },
    portfolio: [],
    portfolioChart: {
      cost: [],
      value: [],
    },
  });

  useEffect(() => {
    const fetchComic = async () => {
      const response = await APIGet(`portfolio/${issueId}`);
      console.log('@@@@@@', response);
      setData(response);
    };
    fetchComic();
  }, []);

  return (
    <div>
      <Typography variant="h6">{data.meta.title}</Typography>
      <Description data={data.meta} />
      <InvestmentChart data={data.portfolioChart} />
      {data.portfolio.map((x) => (
        <ComicListItem key={x.id} data={x} />
      ))}
    </div>
  );

  // return (
  //   <div>
  //     <div
  //       style={{
  //         marginLeft: matches ? '4%' : '10%',
  //         marginRight: matches ? '4%' : '10%',
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: matches ? 'flex' : null,
  //           justifyContent: matches ? 'space-between' : null,
  //         }}
  //       >
  //         <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
  //           {data.length > 0 ? <ComicTitle data={data} /> : null}
  //           <div>
  //             <div
  //               style={{
  //                 marginTop: '4%',
  //                 display: matches ? 'flex' : null,
  //                 justifyContent: matches ? 'flex-start' : null,
  //               }}
  //             >
  //               {/* <div style={{ width: matches ? '250px' : null }}>
  //                 <ComicImage />
  //               </div> */}
  //               <div style={{ width: matches ? '49%' : null }}>
  //                 {/* <Description data={data.portfolio[0]} /> */}
  //               </div>
  //             </div>
  //             <InvestmentChart data={data.portfolioChart} />
  //           </div>
  //         </div>

  //         <div style={{ marginTop: '4%', width: matches ? '48%' : null }}>
  //           <div style={{ width: '100%', maxHeight: matches ? '80vh' : null, overflow: matches ? 'auto' : null }}>
  //             {data.portfolio.map((x) => (
  //               <ComicListItem key={x.id} data={x} />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
