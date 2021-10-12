import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from "react";
import Image from 'material-ui-image';
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useParams
} from "react-router-dom";

    const PlantTile = (props) =>{
        let location = useLocation();
        const {plants, visibility} = props;

    return (
            <Container maxWidth="md" component="main" >
            <Grid container spacing={5} alignItems="flex-end">

              {plants.map((plant) => (
                <Grid item key={plant.id} xs={12} sm={6} md={4} >
                  <Card >
                    <CardHeader title={plant.name} subheader={plant.type} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center', }} sx={{ backgroundColor: "#A9C47F"}} />
                    <CardContent sx={{ backgroundColor: "#edeec9"}}>
                      <Grid sx={{ pt: 1, pb: 2 , ml:5 , mr:5 }}>
                      <Image src='../Images/cucumber.png' fullWidth color="white"/>
                      </Grid>
                      <Typography component="li" variant="subtitle1" align="center" > Humidity: {plant.humidity} %</Typography>
                      <Typography component="li" variant="subtitle1" align="center" > Temperature: {plant.temperature}°C</Typography>
                      <Typography component="li" variant="subtitle1" align="center" > Time of growth: {plant.amountOfDays} days</Typography>
                    </CardContent>
                    <CardActions sx={{ backgroundColor: "#edeec9"}}>
                    <Button 
                      variant="outlined" 
                      variant="contained" 
                      color = 'inherit' 
                      sx={{ backgroundColor: "#adc178"}} 
                      fullWidth  
                      size="medium"  
                      component={Link} 
                      key={plant.id} 
                      to={{ pathname: `/plants/edit/${plant.id}`,state: { background: location } }}>
                      Edit</Button>                 
                    <Button 
                      variant="outlined" 
                      variant="contained" 
                      color = 'inherit' 
                      sx={{ backgroundColor: "#F4B752"}} 
                      fullWidth  
                      size="medium" 
                      component={Link} 
                      key={plant.id} 
                      to={{ pathname: `/plants/delete/${plant.id}`,state: { background: location } }}>
                      Delete</Button>
                  </CardActions>
                  </Card>
                </Grid>
              ))}

            </Grid>
          </Container> 
        )
    
                    }


export default PlantTile;

