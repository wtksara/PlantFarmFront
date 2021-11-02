import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginService from '../../Services/LoginService'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  React, {useCallback, useState} from 'react';
import { authenticate, authFailure, authSuccess } from '../../Auth/authActions';
import { connect } from 'react-redux';

import Footer from '../Footer';

const theme = createTheme();

const LoginPage=({loading,error,...props})=>{

  const [ errors, setErrors] = useState({});
  const [ values, setValues] = useState({
    username : '',
    password : ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(values);
   
      props.authenticate();
    
      LoginService.loginIn(values).then((response)=>{

        if(response.status===200){
            props.setUser(response.data);
            props.history.push('/plants');
            window.location.reload();
        }
        else {
           props.loginFailure('Something Wrong!Please Try Again'); 
        }

      }).catch((err)=>{

        if(err && err.response){
        
        switch(err.response.status){
            case 401:
                console.log("401 status");
                props.loginFailure("Authentication Failed.Bad Credentials");
                break;
            default:
                props.loginFailure('Something Wrong!Please Try Again'); 
        }
        }
        else{
            props.loginFailure('Something Wrong!Please Try Again');
        }
    });
  };


  const handleChange = (e) => {
    e.persist();
    setValues(values => ({
    ...values,
    [e.target.name]: e.target.value
    }));
};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: "#A9C47F" }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={values.username} 
              onChange={handleChange} 
              name="username"
              autoComplete="username"
              autoFocus
              {...(errors.username && {error:true, helperText:errors.username})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.password} 
              onChange={handleChange} 
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...(errors.password && {error:true, helperText:errors.password})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color = 'inherit'
              sx={{ mt: 3, mb: 2, backgroundColor: "#A9C47F"}}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}

const mapStateToProps=({auth})=>{
  console.log("state ",auth)
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