import React, { useState, useEffect } from 'react';
import api from '../../configuration/api';
import { Field, Form, Formik } from 'formik';
import { authenticationService } from '../../services/authentication.service';
import {
  Card,
  Container,
  Typography,
  CardContent,
  Button,
  TextField,
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const classes = useStyles();

  function fetchReviews() {
    setLoading(true);
    setError(null);
    api
      .get('products/' + props.productId + '/reviews')
      .then(function (response) {
        setReviews(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      });
  }

  function addReview(data) {
    api
      .post(
        'buyers/' +
          authenticationService.currentUserValue.userId +
          '/products/' +
          props.productId +
          '/reviews',
        data
      )
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      });
  }

  useEffect(fetchReviews, [props.productId]);

  useEffect(fetchReviews, [props.productId]);

  const prds = reviews.map((review) => {
    return (
      <Card key={review.id} variant="outlined" >
        <CardContent >
          <Typography className={classes.title} gutterBottom variant="h5">
            {review.content}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            -by {review.buyer.fullName}
          </Typography>
        </CardContent>
      </Card>
    );
  });

  let content = prds;
  if (reviews.length > 0) {
    content = prds;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (isLoading) {
    content = <p > We value your reviews, please review our product and service.</p>;
  }

  return (
    <Container className={classes.container} style={{
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      width: '50%',
      float:'left',
    }} >
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Formik
            initialValues={{ content: ' ' }}
            onSubmit={(values) => {
              addReview(values);
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <h4>Write your Review</h4>
                  <Field name="content">
                    {({ field, form, meta }) => (
                      <TextField
                        autoComplete="content"
                        required
                        fullWidth
                        autoFocus
                        {...field}
                        type="text"
                      />
                    )}
                  </Field>
                </Grid>
                        
                <Grid item xs={1} id ="review">
                  <Button type="submit"> Submit Review</Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <h2>Reviews</h2>
          {content}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reviews;
