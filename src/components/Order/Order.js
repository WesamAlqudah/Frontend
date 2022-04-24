import React, { useState, useEffect } from 'react';
import api from '../../configuration/api';
import MUIDataTable from 'mui-datatables';
import { Container, Grid } from '@material-ui/core';

const OrderComponent = (props) => {
  const [orders, setOrders] = useState([]);

  function fetchOrdersByProduct() {
    api
      .get('products/' + props.productId + '/orders')
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(fetchOrdersByProduct, [props.productId]);

  useEffect(fetchOrdersByProduct, [props.productId]);

  function HandleDeliverStatus(id) {
    api
      .patch('orders/' + id + '/deliver')
      .then(function (response) {
        fetchOrdersByProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function HandleShipStatus(id) {
    api
      .patch('orders/' + id + '/ship')
      .then(function (response) {
        fetchOrdersByProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function HandleCancelStatus(id) {
    api
      .patch('orders/' + id + '/cancel')
      .then(function (response) {
        fetchOrdersByProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const options = {
    selectableRows: true,
    selectableRowsOnClick: true,
    onRowClick: handleRowClick,
  };

  function handleRowClick() {
    console.log('Row clicked');
  }

  const columns = [
    { name: 'id', label: 'ID', options: { display: 'excluded' } },
    {
      name: 'status',
    },
    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <button
                onClick={() => {
                  HandleDeliverStatus(tableMeta.rowData[0], true);
                }}
              >
                Deliver
              </button>
              <button
                onClick={() => {
                  HandleShipStatus(tableMeta.rowData[0]);
                }}
              >
                Ship
              </button>
              <button
                onClick={() => {
                  HandleCancelStatus(tableMeta.rowData[0]);
                }}
              >
                Cancel
              </button>
            </>
          );
        },
      },
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <MUIDataTable
            title={'Order Status'}
            data={orders}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default OrderComponent;
