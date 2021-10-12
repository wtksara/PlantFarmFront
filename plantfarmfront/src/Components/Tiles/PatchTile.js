import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
// utils

import Image from 'material-ui-image';
import PropTypes from 'prop-types';

// Icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import sun from '../../Images/sun.png'

// ----------------------------------------------------------------------


import { SvgIcon } from '@material-ui/core';
import { ReactComponent as MySvg } from '../../Images/sun.svg';


 function MySvgIcon() {
   
  
    return(
      <SvgIcon>
        <MySvg/>
      </SvgIcon>
    )
  }

const Measurments = [
  {
    name: 'Temperature',
    value: 20,
    icon: <WbSunnyIcon sx={{ color: "#000000", width:50, height:50 }} />,
    color: '#fcefb4'
  },
  {
    name: 'Humidity',
    value: 30,
    icon: <OpacityIcon sx={{ color: "#000000", width:50, height:50 }}  />,
    color: '#caf0f8'
  },
  {
    name: 'Linkedin',
    value: 40,
    icon: <AcUnitIcon sx={{ color: "#000000", width:50, height:50 }}  />,
    color: '#edeec9'
  },

];


CultivationItem.propTypes = {
  cultivation: PropTypes.object
};

function CultivationItem({ cultivation }) {
  const { color, icon, value, name } = cultivation;  
  
  return (
    <Grid item xs={4} >
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center', borderRadius: '25%',backgroundColor: cultivation.color }}>
      <Card sx={{ py: 2.5,boxShadow: 'none', borderRadius: '25%', textAlign: 'center', backgroundColor: cultivation.color }}>
        {cultivation.icon}
        <Grid sx={{ pt: 1, pb: 2 , ml:5 , mr:5 }}>
          <Image src={sun} fullWidth color="white"/>
       </Grid>
      <Typography variant="h3">{cultivation.value}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {cultivation.name}
      </Typography>
    </Card>
      </Paper>
    </Grid>
  );
}



    const PatchTile = (props) =>{

        const {patchs} = props;
  
 
    return (
        <React.Fragment>
        <SvgIcon sx={{ pt: 2, pb: 2 , backgroundColor: "#edeec9" }} >
        <MySvg/>
      </SvgIcon>
        <Container maxWidth="md" component="main" sx={{ pt: 2, pb: 2 , backgroundColor: "#ffffff" }} >
          
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' ,backgroundColor: "#edeec9"}}>
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} >
        <Toolbar sx={{ backgroundColor: "#b08968"}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs >
            <CardHeader title="Tomatto" subheader="Vegetable" titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center', }} />
            </Grid>
            <Grid item>
              <Button variant="contained" color = 'inherit' sx={{ mr: 1 , backgroundColor: "#F4B752"}}>
                End cultivation
              </Button>
           
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    <Card  sx={{ mr: 1 , backgroundColor: "#edeec9"}} >
      
      <CardContent>
        <Grid container spacing={2}>
          {Measurments.map((cultivation) => (
            <CultivationItem key={cultivation.name} cultivation={cultivation}  />
          ))}
        </Grid>
        <MySvgIcon/>
   
      </CardContent>
    </Card>
  
    <Slider
  aria-label="time"
  defaultValue={30}
/>
    </Paper>


         </Container>
          </React.Fragment>
        )

}


export default PatchTile;

