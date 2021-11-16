import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Jwt_Decode from 'jwt-decode';
import history from './history';

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const checkValidToken = () => {
    if (localStorage.getItem("USER_KEY")) {
        const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("USER_KEY"));
        console.log(jwt_Token_decoded.exp * 1000);
        console.log(Date.now());
        if (jwt_Token_decoded.exp * 1000 < Date.now()) {
          localStorage.clear();
          history.push('/login');
          window.location.reload();
          return false;
        }
      }
    if (localStorage.getItem("USER_KEY")==null){
      history.push('/login');
      window.location.reload();
       return false;
    }
    return true;
  }

  return (
    <Fragment>
      <Route {...rest} render={props => {
            if (checkValidToken()) {
            return <Component {...props} />
            }
        }} />
    </Fragment>
  );
}
export default ProtectedRoute;

