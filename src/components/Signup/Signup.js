import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import api from '../../configuration/api';

const Signup = () => {
  const history = useHistory();

  return (

      <Formik
        initialValues={{ username: '', password: '', fullname: '' }}
        onSubmit={(values) => {
          let seller = false;
          let buyer = false;
          if (values.picked === 'seller') {
            seller = true;
          }
          if (values.picked === 'buyer') {
            buyer = true;
          }
          api
            .post('register', {
              username: values.username,
              password: values.password,
              fullName: values.fullname,
              seller: seller,
              buyer: buyer,
            })
            .then(function (response) {
              cogoToast.success('You have successfully registerd!');
              history.push('/');
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form id="Signup">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field name="fullname">
                  {({ field, form, meta }) => (
                    <TextField
                      autoComplete="fname"
                      label="Fullname"
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
                <Field name="username">
                  {({ field, form, meta }) => (
                    <TextField
                      autoComplete="username"
                      label="Username"
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
                <Field name="password">
                  {({ field, form, meta }) => (
                    <TextField
                      autoComplete="password"
                      label="Password"
                      variant="outlined"
                      required
                      fullWidth
                      autoFocus
                      {...field}
                      type="password"
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <label>
                  <Field type="radio" name="picked" value="buyer" />
                  Buyer
                </label>
                <label>
                  <Field type="radio" name="picked" value="seller" />
                  Seller
                </label>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    // </Box>
  );
};

export default Signup;
