import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Jwt_Decode from 'jwt-decode';
import history from './history';

// Zmodyfikowany komponent Route
const ProtectedRoute = ({ component: Component, ...rest }) => {

  // Sprawdzenie walidacji tokenu
  const checkValidToken = () => {
    // Jeśli użytkownik się zalogował wcześniej i otrzymał token 
    if (localStorage.getItem("USER_KEY")) {
        // Dekodowanie tokenu
        const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("USER_KEY"));
        // Sprawdzenie czy token nadal aktywny
        if (jwt_Token_decoded.exp * 1000 < Date.now()) {
          // Jeśli nie przekierowanie do strony logowania
          localStorage.clear();
          history.push('/login');
          window.location.reload();
          return false;
        }
      }
    // Jeśli użytwkonik nie zalogował sie jeszcze
    if (localStorage.getItem("USER_KEY")==null){
      // Przekierowanie do strony logowania
      history.push('/login');
      window.location.reload();
      return false;
    }
    // W każdym innym przypadku dostęp do strony zezwolony
    return true;
  }

  return (
    <Fragment>
       {/* Sprawdzenie czy użytkownik posiada dostęp do danej strony */}
      <Route {...rest} render={props => {
            if (checkValidToken()) { return <Component {...props} /> }
      }} />
    </Fragment>
  );
}
export default ProtectedRoute;

