import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartProducts from '../ShoppingCartProducts/ShoppingCartProducts';
import Addresses from '../Addresses/Addresses';
import { Button } from '@material-ui/core';
import api from '../../configuration/api';
import { authenticationService } from '../../services/authentication.service';
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router-dom';

export const ShoppingContext = React.createContext({});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '20%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
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
    <div className={classes.root}>
      <ShoppingContext.Provider
        value={{ orderAddress, setOrderAddress, checkout, setCheckout }}
      >
        {props.checkAgain}
        <ShoppingCartProducts />
        <Addresses />
        {checkout === true ? (
          <Button onClick={order}  id="placeOrder">
            Place Order
          </Button>
        ) : (
          <div></div>
        )}
      </ShoppingContext.Provider>
    </div>
  );
};
export default ShoppingCart;
