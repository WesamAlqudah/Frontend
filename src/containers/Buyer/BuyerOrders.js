import React, { useState, useEffect } from 'react';
import api from '../../configuration/api';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MUIDataTable from 'mui-datatables';
import { authenticationService } from '../../services/authentication.service';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const BuyerOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const classes = useStyles();

  function fetchOrdersByBuyer() {
    api
      .get(
        'buyers/' + authenticationService.currentUserValue.userId + '/orders'
      )
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function HandleCancelStatus(id) {
    api
      .patch('orders/' + id + '/cancel')
      .then(function (response) {
        fetchOrdersByBuyer();
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

  useEffect(fetchOrdersByBuyer, []);

  useEffect(fetchOrdersByBuyer, []);

  const columns = [
    {
      name: 'id',
    },
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
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <MUIDataTable
            title={'Customer Order History:'}
            data={orders}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuyerOrders;
