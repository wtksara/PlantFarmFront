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


import WaterTank from '../WaterTank';
import Footer from '../Footer';
import Topic from '../Topic';


const patchs = [
    {
      key:'1',
      isEmpty:false,
      title: 'Pumpkin',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: 72,
      temperature: 20,
      timeOfGrowth: 30,
      actualDay: 5,
      error: 1,
    },
    {
      key:'2',
      isEmpty:false,
      title: 'Cucumber',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: 75,
      temperature: 23,
      timeOfGrowth: 20,
      actualDay: 8,
      error: 2,
    },
    {
      key:'3',
      isEmpty:false,
      title: 'Cucumber',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: 80,
      temperature: 30,
      timeOfGrowth: 40,
      actualDay: 15,
      error:0,
    },  
    {
      key:'4',
      isEmpty:true,
      title: '',
      type:"",
      picture: {
        image: '',
        width: '',
      },
      humidity: "",
      temperature: "",
      timeOfGrowth: "",
      actualDay: "",
      error: 0,
    },
    {
      key:'5',
      isEmpty:false,
      title: 'Cucumber',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: 80,
      temperature: 30,
      timeOfGrowth: 40,
      actualDay: 15,
      error:0,
    },  
  ];

  const ManagmentPage = (props) =>{

        return(
            <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Topic title = "Your cultivations" 
            text = "Manage your plant crops from the control panel. You can monitor the condition of your plants on an ongoing basis and water them remotely."/>
             <PatchTile patchs={patchs} visibility ={true}/>
            <Container maxWidth sx ={{ pb: 4 ,alignItems: 'flex-end' , backgroundColor: "#edeec9"}} >
            <WaterTank visibility ={true}/>
            </Container>
            <Footer/>
            </React.Fragment>
        )
    
}
export default ManagmentPage