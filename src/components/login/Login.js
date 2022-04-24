import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { login } from '../../store/user';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
      <Card id="login">
        <CardContent>
          <Formik  
            initialValues={{ username: '', password: '' }}
            onSubmit={(values) => {
              dispatch(login(values)).then(() => {
                cogoToast.success('Login Successful!');
                history.push('/');
                window.location.reload(true);
              });
            }}
          >

            <Form  >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Field name="username" >
                    {({ field, form, meta }) => (
                      <TextField
                        label="Username"
                        required
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
                        label="Password"
                        required
                        {...field}
                        type="password"
                      />
                    )}
                  </Field>
                  </Grid>
                  <Grid item xs={12}>
               
                  <Button
                    type="submit"
                  >
                    Login
                  </Button>
                  </Grid>
            </Grid>
            </Form>
          </Formik>
          </CardContent>
      </Card>
  );
};

export default LoginComponent;
