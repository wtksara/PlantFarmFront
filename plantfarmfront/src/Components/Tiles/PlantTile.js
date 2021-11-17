import * as React from 'react';
import {Link,
        useLocation} 
        from "react-router-dom";

import {Button,
        Card,
        CardContent,
        CardHeader,
        CardActions,
        Grid,
        Container,
        Typography}
  from '@mui/material';

  const PlantTile = (props) =>{
    let location = useLocation();
    const {plants, visibility} = props;
    const path = 'http://localhost:8080/api/plants/';

    return (
      <Container maxWidth="md"
                component="main" >
        <Grid container spacing={5} 
              alignItems="flex-end">
        {plants.map((plant, id) => (
        <Grid item key={id} 
                    xs={12} 
                    sm={6} 
                    md={4} >
        <Card>
        <CardHeader title={plant.name} 
                    subheader={plant.type} 
                    titleTypographyProps={{ align: 'center' }} 
                    subheaderTypographyProps={{ align: 'center', }} 
                    sx={{ backgroundColor: "#A9C47F"}} />
        <CardContent sx={{ backgroundColor: "#edeec9"}}>
          <Grid style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
          {plant.id ? 
            <img src = {path.concat(plant.id,"/download")}  
                 style={{ height: '180px' , width: '180px'}} />  
            : null}
          </Grid>
          <Typography component="li" variant="subtitle1" align="center" > Humidity: {plant.humidity} %</Typography>
          <Typography component="li" variant="subtitle1" align="center" > Temperature: {plant.temperature}°C</Typography>
          <Typography component="li" variant="subtitle1" align="center" > Time of growth: {plant.amountOfDays} days</Typography>
        </CardContent>
        <CardActions sx={{ backgroundColor: "#edeec9"}}>
        {visibility ? 
        ( <React.Fragment>
          <Button variant="outlined" 
                  variant="contained" 
                  color = 'inherit' 
                  sx={{ backgroundColor: "#adc178"}} 
                  fullWidth  
                  size="medium"  
                  component={Link} 
                  to={{ pathname: `/plants/edit/${plant.id}`,state: { background: location }}}>Edit</Button>                 
          <Button variant="outlined" 
                  variant="contained" 
                  color = 'inherit' 
                  sx={{ backgroundColor: "#F4B752"}} 
                  fullWidth  
                  size="medium" 
                  component={Link} 
                  to={{ pathname: `/plants/delete/${plant.id}`,state: { background: location }}}>Delete</Button>
                      </React.Fragment>
        ) : ( <div/> )}
        </CardActions>
        </Card>
        </Grid>
        ))}
        </Grid>
        </Container> 
    )
 }

export default PlantTile;

