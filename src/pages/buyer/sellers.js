import React, { useEffect } from 'react';
import api from '../../configuration/api';

const Sellers = () => {
  useEffect(getAllSeller, []);

  function getAllSeller() {
    api
      .get(`sellers/`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return <div>All Sellers</div>;
};

export default Sellers;
