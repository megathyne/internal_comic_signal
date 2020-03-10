import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: '25px',
  },
  media: {
    height: 400,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function CompletedApprovalItem(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>Listing Type: {props.data.listingType}</p>
            <p>Price: {props.data.finalPrice}</p>
            <p>Shipping: {props.data.shippingCost}</p>
            <p>Total Cost: {props.data.totalCost}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
