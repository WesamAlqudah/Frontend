import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch, useHistory } from "react-router-dom";
import { authenticationService } from "../../services/authentication.service";
import { Role } from "../../helpers/role";
import Orders from "../buyer/orders";
import Sellers from "../buyer/sellers";
import { AppBar, Button, Chip, Avatar, Box } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ProductPage from "../common/product-page";
import Footer from "../../Footer/footer";


export default function Home() {
  const history = useHistory();

  useEffect(() => {
    if (authenticationService.currentUserValue) {
      if (authenticationService.currentUserValue.role === Role.Admin) {
        history.push("/admin");
      }
      if (authenticationService.currentUserValue.role === Role.Seller) {
        history.push("/seller");
      }
      if (authenticationService.currentUserValue.role === Role.Buyer) {
        history.push("/buyer");
      }
    }
  }, [history]);

  const redirectToSignup = () => {
    history.push("/register");
  };
  const redirectToLogin = () => {
    history.push("/login");
  };

  return (
    <body >
      <CssBaseline />
      <AppBar position="static" id="welcome" >
        <h1>
          <a id="Wpage">Welcome to Mini Online Market</a> 
        </h1>
        {authenticationService.currentUserValue && (
          <>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/buyer/orders");
              }}
            >
              Orders
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/buyer/seller");
              }}
            >
              Follow Sellers
            </Button>
            <Chip
              avatar={<Avatar></Avatar>}
              label={
                authenticationService.currentUserValue &&
                authenticationService.currentUserValue.username
              }
              color="primary"
            />
            <br />


            <Button
              color="inherit"
              onClick={() => {
                authenticationService.logout();
                history.push("/");
              }}
            >
              Sign-Out
            </Button>
          </>
        )}

        {!authenticationService.currentUserValue && (
          <div id="buto">
            <Button
              onClick={redirectToLogin}
            
            >
              Login
            </Button> <label> </label>

            <Button
              onClick={redirectToSignup}
            >
              Sign Up
            </Button>
          </div>
        )}
      </AppBar>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer />
      <Switch>
        <Route path="/buyer/orders" component={Orders} />
        <Route path="/buyer/sellers" component={Sellers} />
        <Route path="/buyer/products/:id" component={ProductPage} />
        <Route path="/">
          <Box component="span" m={1}>
            <Container maxWidth="md">
            </Container>
          </Box>
        </Route>
      </Switch>
    </body>
  );
}
