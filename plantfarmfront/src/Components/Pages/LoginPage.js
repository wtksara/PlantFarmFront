import  React, 
        {useState} 
        from 'react';
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { createTheme, 
        ThemeProvider } 
        from '@mui/material/styles';
import {Box, 
        Button,
        Avatar,
        TextField,
        CssBaseline,
        Typography,
        Container} 
        from '@mui/material';

import { authenticate, authFailure, authSuccess } from '../../Auth/authActions';
import LoginService from '../../Services/LoginService'
import Footer from '../Footer';

const theme = createTheme();

// Komponent wyświetlający strone do logowania się
const LoginPage=({loading,error,...props})=>{

  // Aktualny adres URL
  let location = useLocation();
  // Zmienna przechowująca dane użytkownika
  const [ values, setValues] = useState({
    username : '',
    password : ''
  });

  // Metoda wywoływana po kliknieciu w przycisk 
  const handleSubmit = (event) => {
    event.preventDefault();
    props.authenticate();
  
    // Wywołanie żadania POST 
    LoginService.loginIn(values).then((response)=>{

      // Uwierzytelnienie użytkownika zakończyło się sukcesem
      if(response.status===200){
            // Przypisanie tokenu
            props.setUser(response.data);
            // Przejście do strony głównej
            props.history.push('/');
            window.location.reload();
      }
      // Uwierzytelnienie nie powiodło się
      }).catch((err)=>{

      if(err && err.response){
        switch(err.response.status){
          // Niepoprawne dane użytkownika
          case 401:
                props.history.push({ pathname:'/login/failed', 
                state:  {background: location , 
                  title: "Authentication Failed", 
                  topic: " Authentication has failed, propably bad credentials. Please try again."}});
                console.log("401 status");
                props.loginFailure("Authentication Failed.Bad Credentials");
                break;
          default:
          // Bląd logowania
              props.history.push({ pathname:'/login/failed', 
              state:  {background: location , 
                title: "Error", 
                topic: " Something Wrong! Please Try Again"}});
                props.loginFailure('Something Wrong!Please Try Again'); 
        }}
      else{
        // Bląd logowania
            props.history.push({ pathname:'/login/failed', 
              state:  {background: location , 
                title: "Error", 
                topic: " Something Wrong! Please Try Again"}});
                props.loginFailure('Something Wrong!Please Try Again'); 
            props.loginFailure('Something Wrong!Please Try Again');
      }});
  };

  // Metoda wywoływana w przypadku zmiany wartości pól
  const handleChange = (e) => {
    e.persist();
    // Zapisanie wartości do zmiennej 
    setValues(values => ({
    ...values,
    [e.target.name]: e.target.value
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" 
        maxWidth="xs">
      <CssBaseline/>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, backgroundColor: "#A9C47F" }}/>
      <Typography component="h1" 
        variant="h5">Login in</Typography>
      <Box component="form" 
        onSubmit={handleSubmit} 
        noValidate sx={{ mt: 1 }}>
          <TextField margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            value={values.username} 
            // Obsługa zmiany wartości pola username
            onChange={handleChange} 
            name="username"
            autoComplete="username"
            autoFocus/>
          <TextField margin="normal"
            required
            fullWidth
            value={values.password} 
            // Obsługa zmiany wartości pola password
            onChange={handleChange} 
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"/>
          <Button type="submit"
            fullWidth
            variant="contained"
            color = 'inherit'
            sx={{ mt: 3, mb: 2, backgroundColor: "#A9C47F"}}>
            Sign In</Button>
          </Box>
        </Box>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}
const mapStateToProps=({auth})=>{
  return {
      loading:auth.loading,
      error:auth.error
}}

const mapDispatchToProps=(dispatch)=>{
  return {
      authenticate :()=> dispatch(authenticate()),
      setUser:(data)=> dispatch(authSuccess(data)),
      loginFailure:(message)=>dispatch(authFailure(message))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);