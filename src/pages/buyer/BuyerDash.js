import React, { useEffect } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Route, Switch, useHistory } from "react-router-dom";
import Products from "../../containers/Products/Products";
import { authenticationService } from "../../services/authentication.service";
import { Role } from "../../helpers/role";
import Orders from "./orders";
import Sellers from './sellers';
import { AppBar, Button, Box } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ProductPage from "../common/product-page";


export default function BuyerDash() {

  const history = useHistory();

  useEffect(() => {
    if (authenticationService.currentUserValue) {
      if (authenticationService.currentUserValue.role === Role.Admin) {
        history.push("/admin");
      }
      if (authenticationService.currentUserValue.role === Role.Seller) {
        history.push("/seller");
      }
    }
  }, [history]);



  return (
    <>
      <CssBaseline />
      <AppBar position="static" id="buyerDash" >
        <Toolbar>
          <Typography
            variant="h6"
            color="red"
           
            onClick={() => {
              history.push("/");
            }}
          >
            <h1>
             Welcome Buyer
          </h1>
          </Typography>

          {authenticationService.currentUserValue && (
            <>
            <div id="headBuyer">
              <Button className="button"
                color="inherit"
                onClick={() => {
                  history.push("/buyer/orders");
                }}
              >
                Orders
              </Button>

              <Button className="button"
                color="inherit"
                onClick={() => {
                  history.push("/buyer/seller");
                }}
              >
                Follow Sellers
              </Button>
              
              <Button className="button"
                color="inherit"
                onClick={() => {
                  authenticationService.logout();
                  history.push("/");
                }}
              >
                Sign-Out
              </Button>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/buyer/orders" component={Orders} />
        <Route path="/buyer/sellers" component={Sellers} />
        <Route path="/buyer/products/:id" component={ProductPage} />
        <Route path="/">
          <Box component="span" m={1}>
            <Container maxWidth="md">
              <Products/>
            </Container>
          </Box>
        </Route>
      </Switch>
    </>
  );
}
