import React, { useState, useEffect } from 'react';
import api from '../../../configuration/api';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function fetchReviews() {
    api
      .get('reviews')
      .then(function (response) {
        const tempReviews = response.data.filter((r) => r.approved === false);
        setReviews(tempReviews);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(fetchReviews, []);

  useEffect(fetchReviews, [refresh]);

  const handleApproveReview = (id) => {
    api
      .patch('reviews/' + id + '/approve')
      .then(function (response) {
        setRefresh(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    { name: 'id', label: 'ID', options: { display: 'excluded' } },
    {
      name: 'content',
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
                  handleApproveReview(tableMeta.rowData[0]);
                }}
              >
                Approve Review
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
          <MUIDataTable title={'Reviews'} data={reviews} columns={columns} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminReviews;
