import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import PortfolioChart from '../../components/portfolio-chart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PortfolioItemChart from '../../components/portfolio-item-chart';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ASM from '../../mockData/730623.jpg';
import Heading from '../../components/Heading';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Search() {
  return (
    <Card
      style={{
        marginTop: '4%',
        width: '100%',
      }}
    >
      <CardContent>
        <Typography variant="h5">Add Comic</Typography>
        <TextField id="standard-basic1" fullWidth label="Series" />
        <TextField id="standard-basic2" fullWidth label="Issue" />
        <div style={{ marginTop: '1%' }}>
          <Button variant="contained">Search</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SearchResultItem() {
  return (
    <Card
      style={{
        marginTop: '4%',
        // width: '100%',
      }}
    >
      <CardContent>
        <div style={{ display: 'flex' }}>
          <img width="150px" height="225px" src={ASM} />
          <div style={{ marginLeft: '25px' }}>
            <Typography variant="body1">Amazing Spider-Man (1963)</Typography>

            <Typography variant="body1" style={{ marginTop: '5%' }}>
              #121
            </Typography>
            <Button variant="contained" style={{ marginTop: '5%' }}>
              Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SearchResults() {
  return (
    <div>
      <SearchResultItem />
      <SearchResultItem />
      <SearchResultItem />
    </div>
  );
}

function AddComicForm() {
  return (
    <Card
      style={{
        marginTop: '1%',
        // width: '40%',
      }}
    >
      <CardContent>
        <div style={{ display: 'flex' }}>
          <img width="150px" height="225px" src={ASM} />
          <div style={{ marginLeft: '25px' }}>
            <Typography variant="h6">Amazing Spider-man (1963)</Typography>
            <Typography variant="h6">#121</Typography>
            <div>
              <TextField fullWidth id="standard-basic1" label="Grade" />
            </div>
            <div>
              <TextField fullWidth id="standard-basic2" label="Page Color" />
            </div>
            <div>
              <TextField fullWidth id="standard-basic3" label="Grader" />
            </div>
            <div>
              <TextField fullWidth id="standard-basic4" label="Cost" />
            </div>
            <div>
              <TextField fullWidth id="standard-basic5" label="Acquired" />
            </div>
            <div>
              <TextField fullWidth id="standard-basic6" label="Vendor" />
            </div>
            <div>
              <TextField fullWidth id="standard-basic7" label="Notes" />
            </div>
            <div style={{ marginTop: '4%' }}>
              <Button variant="contained">Submit</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AddComic(props) {
  const matches = useMediaQuery('(max-resolution: 1dppx)');
  return (
    <div>
      <Heading />
      <div style={{ marginLeft: matches ? '4%' : '10%', marginRight: matches ? '4%' : '10%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Search />
        </div>

        <div
          style={{
            display: matches ? 'flex' : null,
            justifyContent: matches ? 'space-around' : null,
          }}
        >
          <SearchResults />
          <AddComicForm />
        </div>
      </div>
    </div>
  );
}
