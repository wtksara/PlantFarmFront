import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import PatchTile from '../Tiles/PatchTile';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { withStyles } from '@mui/styles';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Footer from '../Footer';
import Topic from '../Topic';


const patchs = [
    {
      key:'1',
      title: 'Pumpkin',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: "72",
      temperature: "20",
      timeOfGrowth: "20",
      visibility:'true'
    },
    {
      key:'2',
      title: 'Cucumber',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: "75",
      temperature: "23",
      timeOfGrowth: "20",
      visibility:'true'
    },
    {
      key:'3',
      title: '',
      type:"",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: "80",
      temperature: "30",
      timeOfGrowth: "20",
      visibility:'true'
    },  
  ];

  const ManagmentPage = (props) =>{

  const styles = {
    textCenter: {
      textAlign: "center"
    },
    textMuted: {
      color: "#6c757d"
    },
  };
  
  const CustomSlider = withStyles({

    thumb: { 
              width: "200px !important",
              heigh: "50px !important",
              backgroundColor: "#42a5f5",},
    active: { 
              width: "200px", 
              backgroundColor: "#42a5f5",},
    track: { 
              width: "200px !important",
              border: "3px solid grey",
              color: "#42a5f5"},
    rail: { 
              width: "200px !important",
              border: "3px solid black",
              color: "#001d3d"}
  })(Slider);
  
  
  const marks = [
      { value: 4, label: '0%', },
      { value: 25, label: '25%', },
      { value: 50, label: '50%', },
      { value: 75, label: '75%', },
      { value: 96, label: '100%',},
    ];
    
    const useStyles = makeStyles(styles);      
    const classes = useStyles();

        return(

            <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Topic title = "Your cultivations" 
            text = "Manage your plant crops from the control panel. You can monitor the condition of your plants on an ongoing basis and water them remotely."/>
             <PatchTile patchs={patchs}/>
            <Container maxWidth sx ={{ pb: 4 ,alignItems: 'flex-end' , backgroundColor: "#edeec9"}} >
            <Topic title ="Water tank" text="Check the condition of your plants and water them if needed" />
            <Grid align="center">
              <Box sx={{ height: 300 , ml:5}}>
                <CustomSlider
                aria-label="Restricted values"
                defaultValue={50}
                orientation="vertical"
                step={25}
                valueLabelDisplay="auto"
                marks={marks}/>
              </Box>
            </Grid>
            <Grid align="center" sx={{ pt: 3 }}>
            <Button variant="contained" color ='inherit' sx={{ backgroundColor: "#42a5f5"}}  size="medium"> Water plants</Button>
            </Grid>
            </Container>
            <Footer/>
            </React.Fragment>
        )
    
}
export default ManagmentPage