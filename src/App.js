import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/index';
import Admin from './pages/admin';
import SellerP from './pages/seller';
import Buyer from './pages/buyer';
import SellerPage from './pages/common/seller-page';
import Login from './pages/common/login';
import Register from './pages/common/register';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Role } from './helpers/role';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
        <PrivateRoute
          path="/seller"
          roles={[Role.Seller]}
          component={SellerP}
        />
        <PrivateRoute path="/buyer" roles={[Role.Buyer]} component={Buyer} />
        <Route path="/sellers/:id" component={SellerPage} />
        <Route exact path="/" component={Home} />
        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
