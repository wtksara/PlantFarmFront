import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Topic(props) {
    
        return(
            <Container  disableGutters maxWidth="sm" component="main" sx={{ pt: 4, pb: 4 }}>
            <Typography  component="h1" variant="h3" align="center" color="text.primary" gutterBottom>
              {props.title}
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" component="p">
              {props.text}
            </Typography>
          </Container>
        )
}
