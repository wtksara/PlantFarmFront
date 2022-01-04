import React from 'react'
import { withStyles } from '@mui/styles';
import { useLocation, useHistory} from "react-router-dom";
import { useEffect, useState} from 'react'
import {Button ,
        Box,
        Slider,
        Typography,
        Grid }
  from '@mui/material';

import Topic from './Topic';
import TankService from '../Services/TankService'

// Komponent odpowiedzialny za obsługe zbiornika wody
export default function WaterTank(props) {
    
    // Zmienne przechowujące dane
    const {visibility} = props;
    const [tank, setTank] = useState([]);
    const [textInfo, setTextInfo] = useState();

    // Aktualny adres URL
    let location = useLocation();

    // Dostęp do histori w celu nawigacji
    let history = useHistory();

    // Funkcja wykonywana podczas renderowania komponentu
    useEffect(() => {
      // Wywołanie żadania GET w celu uzyskania pierwszego zbiornika wody
      TankService.getTank(1).then((response) => {
        // Przypisanie danych do zmiennej tank
        setTank(response.data)
      })
    }, []);

    // Stylowanie suwaka, tak aby przypomniał wyglądem zbiornik wody
    const CustomSlider = withStyles({
        thumb: {  width: "200px !important",
                  heigh: "50px !important",
                  backgroundColor: "#42a5f5",},
        active: { width: "200px", 
                  backgroundColor: "#42a5f5",},
        track: {  width: "200px !important",
                  border: "3px solid grey",
                  color: "#42a5f5"},
        rail: {   width: "200px !important",
                  border: "3px solid black",
                  color: "#001d3d"}
      })(Slider);
      
      // Poziomy wody
      const marks = [
          { value: 4, label: '0%', },
          { value: 26, label: '25%', },
          { value: 50, label: '50%', },
          { value: 75, label: '75%', },
          { value: 98, label: '100%',},
        ];
    
      // Funkcja obsługująca próbę podlania roślin
      const handleWateringPlants = x => {
      // Wywołanie żadania GET w celu uzyskania pierwszego zbiornika wody
      TankService.getTank(1).then((response) => {
        // Informacja o próbie wykonania procesu
        setTextInfo("Watering in progress. Waiting for answer from the water pump");
        
        setTank(response.data);
          // Sprawdzenie poziomu wody w zbiorniku przed próba podlania tak aby stan wody nie był krytyczny
          if (response.data.level > 5){
            // Wykonanie żadania POST w celu próby podlania roślin
            TankService.waterPlants(1).then(res => { 
            // Podlanie zakończone zostało sukcesem
            if(res.status===200){
                setTextInfo("");
                // Wyświelenie komunikatu informującego o udanej próbie
                history.push({ pathname:'/management/watering/success', 
                state:  {background: location , 
                title: "Watering succesful", 
                topic: "Your plants has been watered."}});
              }
            // Podlanie się nie powiodło
            }).catch((err)=>{
              setTextInfo("");
              if(err && err.response){
                switch(err.response.status){
                  default:
                    // Wyświelenie komunikatu informującego o nieudanej próbie
                    history.push({ pathname:'/management/watering/failed', 
                    state:  {background: location , 
                    title: "Watering failed", 
                    topic: "You do not have a connection with a water pump. Recheck the connection."}});
                }}}
            )}
          else {
              setTextInfo("");
              // Wyświelenie komunikatu informującego o zbyt niskim stanie zbiornika
              history.push({ pathname:'/management/watering/failed', 
              state:  {background: location , 
              title: "Watering failed", 
              topic: "Level of water in the tank is to low to water plants. Please refill the tank."}});
          }
      });  
      }

        return(
            <React.Fragment>
            <Topic title ="Water tank" 
                   text="Check the condition of your plants in control panel. Based on the actual measurments and uncoming alerts decided if your plants need the water. " />
            <Grid align="center">
              <Box sx={{ height: 300 , ml:5}}>
                 {/* Zbiornik wody utworzony z wykorzystaniem suwaka*/}
                <CustomSlider disabled
                        aria-label="Restricted values"
                        defaultValue={tank.level}
                        orientation="vertical"
                        step={25}
                        valueLabelDisplay="auto"
                        marks={marks}/>
              </Box>
            </Grid>
            <Grid align="center" 
                  sx={{ pt: 3 }}>
             {/* Przycisk próby podlania roślin nie jest wyświetlany na stronie głównej */}
            { visibility ? (
                <Button variant="contained" 
                        color ='inherit' 
                        sx={{ backgroundColor: "#42a5f5"}}  
                        onClick = {handleWateringPlants}
                        size="medium">Water plants</Button>
            ) : ( <div/>) }
            <Typography sx={{ pt: 2 }}>{textInfo}</Typography>
            </Grid>
            </React.Fragment>
  )
}
