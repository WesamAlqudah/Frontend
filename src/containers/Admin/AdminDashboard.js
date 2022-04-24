import React, { Fragment } from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Sellers from './Sellers/Sellers';
import Reviews from './Reviews/Reviews';
import { Button} from '@material-ui/core';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { authenticationService } from '../../services/authentication.service';

export default function Dashboard() {
  const history = useHistory();
  return (
    <Fragment>
      <AppBar position="static" id="adminDash">
        <Toolbar>    
            <h3>Welcome Admin</h3>
          <div id="head">
          <Link to="/admin/reviews" style={{textDecoration:"none"}}> 
            <Button className="button">Pending Reviews</Button>
          </Link> 
          
          <Link to="/admin/sellers" style={{textDecoration:"none"}}>
            <Button className="button">Pending Sellers</Button>
          </Link>
          <Button  className="button"
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
      <main>
        <Box mt={2}>
          <Switch>
            <Route path="/admin/reviews" component={Reviews} />
            <Route path="/admin/sellers" component={Sellers} />
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
      </Fragment>
  );
}

