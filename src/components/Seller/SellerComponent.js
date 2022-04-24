import React, { useState, useEffect } from 'react';
import api from '../../configuration/api';
import MUIDataTable from 'mui-datatables';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Field, Form, Formik } from 'formik';
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router';
import { authenticationService } from '../../services/authentication.service';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'static',
    width: 900,
    backgroundColor: theme.palette.background.paper,
    
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // width: 700
    marginLeft: theme.spacing(-40),
    marginTop:theme.spacing(40),
    
  },
}));

const SellerComponent = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleEditModal = (id) => {
    setProductId(id);
    api
      .get('products/' + id)
      .then(function (response) {
        setProduct(response.data);
        setEditMode(true);
        setOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddModal = () => {
    setOpen(true);
    setEditMode(false);
  };

  function fetchProductsBySeller() {
    api
      .get(
        'sellers/' + authenticationService.currentUserValue.userId + '/products'
      )
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(fetchProductsBySeller, []);

  useEffect(fetchProductsBySeller, []);

  function editProduct(data) {
    api
      .patch('products/' + productId, data)
      .then(function (response) {
        cogoToast.success('Product is Edited!');
        fetchProductsBySeller();
        setOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        cogoToast.error('oops! please try again.');
      });
  }
  function AddProduct(data) {
    api
      .post(
        'sellers/' +
          authenticationService.currentUserValue.userId +
          '/products',
        data
      )
      .then(function (response) {
        cogoToast.success('Product is added.');
        fetchProductsBySeller();
        setOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        cogoToast.error('oops! please try again.');
      });
  }
  function DeleteProduct(id) {
    api
      .delete('products/' + id)
      .then(function (response) {
        cogoToast.success('Product is added.');
        fetchProductsBySeller();
      })
      .catch(function (error) {
        console.log(error);
        cogoToast.error('Oops! please try again.');
      });
  }
  function redirectToOrders(id) {
    history.push('/seller/orders/' + id);
  }

  const columns = [
    { name: 'id', label: 'ID', options: { display: 'excluded' } },
    {
      name: 'name',
    },
    {
      name: 'description',
    },
    {
      name: 'price',
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
              <button className="editDeleteOrders"
                onClick={() => {
                  handleEditModal(tableMeta.rowData[0], true);
                }}
              >
                Edit
              </button>
              <button className="editDeleteOrders"
                onClick={() => {
                  DeleteProduct(tableMeta.rowData[0]);
                }}
               >
                Delete
              </button>
              <button className="editDeleteOrders"
                onClick={() => {
                  redirectToOrders(tableMeta.rowData[0]);
                }}
              >
                Orders
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
            title={
              <div>
                <Grid item xs={3}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={() => {
                      handleAddModal();
                    }}
                  id="createNewProduct">
                    Add New Product
                  </Button>
                </Grid>
              </div>
            }
            data={products}
            columns={columns}
          />

          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Product
                  </Typography>

                  <Formik
                    initialValues={{
                      name: editMode ? product.name : '',
                      description: editMode ? product.description : '',
                      price: editMode ? product.price : '',
                    }}
                    onSubmit={(values) => {
                      editMode ? editProduct(values) : AddProduct(values);
                    }}
                  >
                    <Form id="sellerComp">
                        <Grid item xs={12}>
                          <Field name="name">
                            {({ field, form, meta }) => (
                              <TextField
                                autoComplete="name"
                                label="Product Name"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                                {...field}
                                type="text"
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={12}>
                          <Field name="description">
                            {({ field, form, meta }) => (
                              <TextField
                                autoComplete="description"
                                label="Product Description"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                                {...field}
                                type="text"
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={12}>
                          <Field name="price">
                            {({ field, form, meta }) => (
                              <TextField
                                autoComplete="price"
                                label="Price"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                                {...field}
                                type="number"
                              />
                            )}
                          </Field>
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          {editMode ? 'Edit Product' : 'Add Product'}
                        </Button>
                      {/* </Grid> */}
                    </Form>
                  </Formik>
                </div>
              </Container>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
export default SellerComponent;
