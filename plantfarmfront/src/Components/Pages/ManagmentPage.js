import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import Footer from '../Footer';
import Topic from '../Topic';
import PatchTile from '../PatchTile';

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

class ManagmentPage extends React.Component{
    render(){
        return(
            <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Topic title = "Managment" 
            text = "Manage your plant crops from the control panel. You can monitor the condition of your plants on an ongoing basis and water them remotely."/>
            <PatchTile patchs={patchs}/>
            <Footer/>
            </React.Fragment>
        )
    }
}
export default ManagmentPage