import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import LoginComponent from '../../components/login/Login';
import { authenticationService } from '../../services/authentication.service';
import Footer from '../../Footer/footer';
const Login = () => {
  const history = useHistory();
  useEffect(() => {
    if (authenticationService.currentUserValue) {
      history.push('/');
    }
  }, [history]);
  return (
    <div>
      <LoginComponent />
     
    </div>
  );
};

export default Login;
