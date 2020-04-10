import React, { useState } from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  makeStyles,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import { APIGet, APIPost } from '../../api/api';
import Form from './form';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '2%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
function Search(props) {
  const classes = useStyles();

  return (
    <Card
      style={{
        width: '100%',
      }}
    >
      <CardContent>
        <Typography variant="h5">Add Comic</Typography>
        <TextField id="standard-basic-series" fullWidth label="Series" onChange={props.handleChange('series')} />
        <TextField id="standard-basic-issue" fullWidth label="Issue" onChange={props.handleChange('issue')} />
        <div style={{ marginTop: '1%', display: 'flex' }}>
          <Button
            style={{ marginRight: '5%', marginTop: '2%' }}
            variant="contained"
            onClick={() => props.handleClick()}
            disabled={props.disableSubmit}
          >
            Search
          </Button>
          <Button
            style={{ marginRight: '5%', marginTop: '2%' }}
            variant="contained"
            href='/'
            disabled={props.disableSubmit}
          >
            Cancel
          </Button>
          <div className={classes.root}>{props.disableSubmit ? <LinearProgress /> : null}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function SearchResultItem(props) {
  return (
    <Card
      style={{
        marginTop: '4%',
      }}
    >
      <CardContent>
        <div style={{ display: 'flex' }}>
          <img alt="" width="100" height="151px" src={`data:image/jpeg;base64,${props.data.coverSmall.small}`} />

          <div style={{ marginLeft: '25px' }}>
            <Typography variant="body1">{props.data.seriesName}</Typography>

            <Typography variant="body1" style={{ marginTop: '5%' }}>
              {`(${props.data.yearBegan})`}
            </Typography>

            <Typography variant="body1" style={{ marginTop: '5%' }}>
              {`#${props.data.issueNumber}`}
            </Typography>
            <Form data={props.data} submitComic={props.submitComic} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AddComic(props) {
  const matches = useMediaQuery('(max-resolution: 1dppx)');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [search, setSearch] = useState({});

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (name) => (event) => {
    let s = search;
    s[name] = event.target.value;
    setSearch(s);
  };

  const handleClick = async () => {
    try {
      setDisableSubmit(true);
      const results = await APIGet('comic', {
        issueNumber: search.issue,
        comicSeries: search.series,
      });
      setSearchResults(results);
      setDisableSubmit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitComic = async (item) => {
    try {
      await APIPost('inventory', item);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ marginTop: '2%', marginLeft: matches ? '4%' : '10%', marginRight: matches ? '4%' : '10%' }}>
        <div
          style={{
            display: matches ? 'flex' : null,
            justifyContent: matches ? 'space-between' : null,
          }}
        >
          <div style={{ width: matches ? '60%' : null }}>
            <Search disableSubmit={disableSubmit} handleChange={handleChange} handleClick={handleClick} />
          </div>
          <div>
            <div
              style={{
                display: matches ? 'flex' : null,
                justifyContent: matches ? 'space-around' : null,
              }}
            >
              <div>
                {searchResults.map((x) => {
                  return <SearchResultItem key={x.issueId} data={x} submitComic={submitComic} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
