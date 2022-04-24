import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartProducts from '../ShoppingCartProducts/ShoppingCartProducts';
import Addresses from '../Addresses/Addresses';
import { Button, Grid, Paper, Box, Typography } from '@material-ui/core';
import api from '../../configuration/api';
import { authenticationService } from '../../services/authentication.service';
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router-dom';

export const ShoppingContext = React.createContext({});

const useStyles = makeStyles((theme) => ({
  // root: {
  //   width: '20%',
  // },
  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   fontWeight: theme.typography.fontWeightRegular,
  // },
}));

const ShoppingCart = (props) => {
  const [orderAddress, setOrderAddress] = useState({
    shipping: null,
    billing: null,
  });

  const [checkout, setCheckout] = useState(false);
  const history = useHistory();


  const order = () => {
    api
      .post(
        'buyers/' +
        authenticationService.currentUserValue.userId +
        '/shoppingcart/process',
        {
          shippingAddress: orderAddress.shipping,
          billingAddress: orderAddress.billing,
        }
      )
      .then((response) => {
        cogoToast.success('Successfully Ordered!');
        history.push('/');
      });
  };

  const classes = useStyles();
  return (
    <ShoppingContext.Provider
      value={{ orderAddress, setOrderAddress, checkout, setCheckout }}>
      {/* <Grid item xs={12} md={8} lg={8}> */}
        <Paper
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <Typography variant='h6' align='center' > My Shopping Cart </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <ShoppingCartProducts />
            <Addresses />
            {/* <h3>product.name</h3>
                  <h5>product.description</h5> */}
            {checkout !== true ? (
              <Button size="small" onClick={order} id="placeOrder" >
                Place Order
              </Button>
            ) : <div></div>}
          </Box>
        </Paper>
      {/* </Grid> */}

    </ShoppingContext.Provider>
  );
};
export default ShoppingCart;
