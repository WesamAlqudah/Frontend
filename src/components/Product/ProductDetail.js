import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import api from '../../configuration/api';
import ShoppingCart from '../../containers/ShoppingCart/ShoppingCart';
import Reviews from '../../containers/Reviews/Reviews';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { authenticationService } from '../../services/authentication.service';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function ProductDetail(props) {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [product, setProduct] = useState();

  function fetchProductDetail() {
    api
      .get('products/' + props.productId)
      .then(function (response) {
        setProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const addToCart = () => {
    api
      .get(
        'buyers/' +
          authenticationService.currentUserValue.userId +
          '/shoppingcart'
      )
      .then(function (response) {
        let products = response.data;
        products.push(product);
        api
          .patch(
            'buyers/' +
              authenticationService.currentUserValue.userId +
              '/shoppingcart',
            products
          )
          .then(function (response) {
            setRefresh(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  };

  useEffect(fetchProductDetail, [props.productId]);

  useEffect(fetchProductDetail, [props.productId, refresh]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Product Detail */}
            <Grid item xs={12} md={8} lg={8}>
              <Paper
                style={{
                  // height: '50%',
                  // width: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <h3>{product && product.name}</h3>
                  <h5>{product && product.description}</h5>

                  <Button size="small" id="addItem" onClick={addToCart}>
                    Add to Cart
                  </Button>
                </Box>
              </Paper>
            </Grid>
             
            <Grid item xs={12} md={4} lg={4}>
              <ShoppingCart checkAgain={refresh} />
            </Grid>
            {/* Reviews */}
            <Grid item xs={12}>
              <Reviews productId={props.productId} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
