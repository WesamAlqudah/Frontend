import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { authenticationService } from '../../services/authentication.service';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    width: 275,
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Products = (props) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const config = {
    method: 'get',
    url: 'http://localhost:8080/products',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  };

  function fetchProducts() {
    setLoading(true);
    setError(null);
    axios(config)
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      });
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prds = products.map((product) => {
    if (authenticationService.currentUserValue) {
      return (
        <Grid item md={4} key={product.id}>
          <Link
            to={`/buyer/products/${product.id}`}
            key={product.id}
            style={{
              textDecoration: 'none',
            }}
          >
            <Card className={classes.card} styles={{}}>
              
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography>{product.description}</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      );
    } else {
      return (
        <Grid item md={4}>
          <Card className={classes.card} key={product.id} styles={{}}>
           
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography>{product.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }
  });

  let content = prds;

  if (products.length > 0) {
    content = prds;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (isLoading) {
    content = <p> Loading ... </p>;
  }

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {content}
    </Grid>
  );
};

export default Products;
