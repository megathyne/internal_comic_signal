import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { APIPost } from '../../api/api';

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
  // const approveTransaction = async () => {
  //   await APIPost('approval', {
  //     inventoryId: props.data.inventoryId,
  //     ebayItemId: props.data.id,
  //     isApproved: true,
  //   });
  // };

  // const rejectTransaction = async () => {
  //   await APIPost('approval', {
  //     inventoryId: props.data.inventoryId,
  //     ebayItemId: props.data.id,
  //     isApproved: false,
  //   });
  // };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* <  kkCardMedia className={classes.media} image={props.data.galleryURL} title="Contemplative Reptile" /> */}
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
      {/* <CardActions className={classes.actions}>
        <Button size="small" color="primary" onClick={approveTransaction}>
          APPROVE
        </Button>
        <Button size="small" color="primary" onClick={rejectTransaction}>
          REJECT
        </Button>
      </CardActions> */}
    </Card>
  );
}
