import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import Image from 'material-ui-image';

import DeletePlantWindow from './DeletePlantWindow';
import PlantForm from './PlantForm';

    const PlantTile = (props) =>{
        const {tiers} = props;
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
    

    return (
            <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">

              {tiers.map((tier) => (
                <Grid item key={tier.title} xs={12} sm={6} md={4} >
                  <Card >
                    <CardHeader title={tier.title} subheader={tier.type} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center', }} sx={{ backgroundColor: "#A9C47F"}} />
                    <CardContent sx={{ backgroundColor: "#edeec9"}}>
                      <Grid sx={{ pt: 1, pb: 2 , ml:5 , mr:5 }}>
                      <Image src='../Images/cucumber.png' fullWidth color="white"/>
                      </Grid>
                      <Typography component="li" variant="subtitle1" align="center" > Humidity: {tier.humidity} %</Typography>
                      <Typography component="li" variant="subtitle1" align="center" > Temperature: {tier.temperature}°C</Typography>
                      <Typography component="li" variant="subtitle1" align="center" > Time of growth: {tier.timeOfGrowth} days</Typography>
                    
                    </CardContent>
                    <CardActions sx={{ backgroundColor: "#edeec9"}}>
                    {tier.visibility ? <DeletePlantWindow/> : null }
                    </CardActions>
                  </Card>
                </Grid>
              ))}

            </Grid>
          </Container> 
        )
    
                    }


export default PlantTile;

