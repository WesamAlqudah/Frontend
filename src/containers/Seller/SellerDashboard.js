import React, { Fragment, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import api from '../../configuration/api';
import { Button} from '@material-ui/core';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Products from '../../pages/seller/products';
import Orders from '../../pages/seller/orders';
import { authenticationService } from '../../services/authentication.service';


export default function SellerDashboard() {
  const history = useHistory();
  const [active, setActive] = useState(false);

  useEffect(getLoggedInSeller, []);

  function getLoggedInSeller() {
    api
      .get(`sellers/ +${authenticationService.currentUserValue.userId}`)
      .then(function (response) {
        setActive(response.data.approved);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Fragment>
      <AppBar position="static" id="sellerDash">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => {
              history.push('/');
            }}
          >
            <h3>Welcome Seller</h3>
          </Typography>
          <div id="head">


          {active ? (
            <>
              {' '}

              <Link to="/seller/products" style={{textDecoration:"none"}}>
                <Button className="button">Add Products</Button>
              </Link>
            </>
          ) : (
            ''
          )}
          <Button className="button"
            color="inherit"
            onClick={() => {
              authenticationService.logout();
              history.push('/');
            }}
          >
            Logout
          </Button>
          </div>
        </Toolbar>
      </AppBar>
      {active ? (
        <main>
          <Box mt={2}>
            <Switch>
              <Route exact path="/seller/products" component={Products} />
              <Route path="/seller/orders/:productId" component={Orders} />
              <Route path="/">
                <Container maxWidth="lg">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                    </Grid>
                  </Grid>
                </Container>
              </Route>
            </Switch>
          </Box>
        </main>
      ) : (
        <main>
          <Box mt={2}>
            <Switch>
              <Route path="/">
                <Container maxWidth="lg">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                      <h1>Sorry, your account is not active please wait for Admin Approval.</h1>
                    </Grid>
                  </Grid>
                </Container>
              </Route>
            </Switch>
          </Box>
        </main>
      )}
    </Fragment>
  );
}
