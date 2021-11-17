import * as React from 'react';
import {Link,
        Container,
        Typography}
        from '@mui/material';

function Copyright(props) {
    return (
      <Typography variant="body2" 
                  color="text.secondary" 
                  align="center" {...props}>
                  {'Copyright © '}
      <Link color="inherit" 
            href="#"> Plant Farm</Link> {' '}
      {new Date().getFullYear()}
      {'.'}
      </Typography>
    );
  }
  
class Footer extends React.Component{
    render(){
        return (
        <Container maxWidth="md" 
                   component="footer" 
                   sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, mt: 8, py: [3, 6], }}>
        <Copyright sx={{ mt: 5 }} />
        </Container>
        )
    }
}

export default Footer;