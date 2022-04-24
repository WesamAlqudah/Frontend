import React, { useState, useEffect } from 'react';
import api from '../../configuration/api';
import { authenticationService } from '../../services/authentication.service';
import { Box} from '@material-ui/core';

const ShoppingCartProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  function fetchProducts() {
    setLoading(true);
    setError(null);
    api
      .get(
        'buyers/' +
          authenticationService.currentUserValue.userId +
          '/shoppingcart'
      )
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        setLoading(false);
        setError(error.message);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateShoppingCart = (prods) => {
    api
      .patch(
        '/buyers/' +
          authenticationService.currentUserValue.userId +
          '/shoppingcart',
        prods
      )
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      });
  };
  const handleDelete = (id) => {
    updateShoppingCart(products.filter((product) => product.id !== id));
  };

  const prds = products.map((product) => {
    return (
      <div id="itemsInCart">
        Name={product.name }<br/>
        Price={' $' + product.price}<br/>
        <button onClick={()=>{handleDelete(product.id)}} id="itemsInCartDeletButton">Delete Item</button>
    
      </div>
    );
  });

  let content = prds;
  if (products.length > 0) {
    content = prds;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (isLoading) {
    content = <p id="emptyCart"> Your Cart is Empty</p>;
  }

  return (
    <Box display="flex" justifyContent="space-between" mb={1}>
      <li>
      {content}
      </li>
    </Box>
  );
};

export default ShoppingCartProducts;
