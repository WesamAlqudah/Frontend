import React, { useState, useEffect } from 'react';
import api from '../../../configuration/api';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function fetchSellers() {
    api
      .get('sellers')
      .then(function (response) {
        const tempSellers = response.data.filter((s) => s.approved === false);
        setSellers(tempSellers);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(fetchSellers, []);

  useEffect(fetchSellers, [refresh]);

  const handleApproveSeller = (id) => {
    api
      .patch('sellers/' + id + '/approve')
      .then(function (response) {
        console.log('Approved');
        setRefresh(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    { name: 'id', label: 'ID', options: { display: 'excluded' } },
    {
      name: 'username',
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
              {' '}
              <button className="editDeleteOrders"
                onClick={() => {
                  handleApproveSeller(tableMeta.rowData[0]);
                }}
              >
                Approve Seller
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
          <MUIDataTable title={'Sellers'} data={sellers} columns={columns} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminSellers;
