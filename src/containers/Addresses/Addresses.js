import React, { useState, useEffect, useContext } from 'react';
import api from '../../configuration/api';
import Address from '../../components/Address/Address';
import { ShoppingContext } from '../ShoppingCart/ShoppingCart';
import { authenticationService } from '../../services/authentication.service';
import { Box } from '@material-ui/core';

const Addresses = (props) => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { orderAddress, setOrderAddress, setCheckout } =
    useContext(ShoppingContext);

  function fetchAddresses() {
    setLoading(true);
    setError(null);
    api
      .get(
        'buyers/' + authenticationService.currentUserValue.userId + '/addresses'
      )
      .then(function (response) {
        setAddresses(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      });
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  const chosenAddress = (id) => {
    setOrderAddress({
      billing: addresses.filter((address) => address.id === id)[0],
      shipping: addresses.filter((address) => address.id === id)[0],
    });
    setCheckout(true);
  };

  const prds = addresses.map((address) => {
    if (orderAddress.id === address.id) {
      address.addressType = 'CHECKED';
      return (
        <Address
          clicked={() => {
            chosenAddress(address.id);
          }}
          checked={address.addressType}
          key={address.id}
          id={address.id}
          city={address.city}
          zipCode={address.zipCode}
          state={address.state}
          country={address.country}
        />
      );
    }
    return (
      <Address
        clicked={() => {
          chosenAddress(address.id);
        }}
        checked={address.addressType}
        key={address.id}
        id={address.id}
        city={address.city}
        zipCode={address.zipCode}
        state={address.state}
        country={address.country}
      />
    );
  });

  
  let content = prds;
  if (addresses.length > 0) {
    content = prds;
  } else if (error) {
    content = <p>{error}</p>;
  } 
  else if (isLoading) {
    content = <p> No Addresses ... </p>;
  }

  return (
    <div >
    <h5 id="seladd">Please Select your address</h5>
    <Box display="flex" mb={1}>
      {content}
    </Box>
    </div>
  );
};

export default Addresses;
