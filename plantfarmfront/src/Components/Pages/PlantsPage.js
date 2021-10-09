import React from 'react'
import PlantTile from '../PlantTile';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

import PlantForm from '../PlantForm';
import DialogPage from '../DialogPage';
import Footer from '../Footer';
import Topic from '../Topic';

const tiers = [
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
      title: 'Peper',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: "80",
      temperature: "30",
      timeOfGrowth: "20",
      visibility:'true'
    },
    {
        key:'4',
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
  ];



export default function PlantsPage() {
 
       const [openForm, setOpenForm] = useState(false)

        return(
            <React.Fragment>
              <Topic title = "Collection of your plants" text = "Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis.."/>
              <Container disableGutters maxWidth="xs" component="main" sx={{  pb: 4 }}>
              <Grid alignItems="flex-end">
                <Button onClick = {() => setOpenForm(true)} fullWidth position="absolute" variant="contained" color ='inherit' sx={{ backgroundColor: "#F8D090",  alignItems: 'flex-end' }} size="medium"><AddIcon/>Add new plant</Button>
              </Grid>
              </Container>
            <PlantTile tiers={tiers}/>
            <DialogPage title = "Add new plant" openForm = {openForm} setOpenForm = {setOpenForm}>
              <PlantForm/>
            </DialogPage>
            <Footer/>
            </React.Fragment>
        )
    
};
