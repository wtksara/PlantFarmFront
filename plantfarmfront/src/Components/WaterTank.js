import React from 'react'
import { withStyles } from '@mui/styles';
import { useLocation, useHistory} from "react-router-dom";
import { useEffect, useState} from 'react'
import {Button ,
        Box,
        Slider,
        Grid }
  from '@mui/material';

import Topic from './Topic';
import TankService from '../Services/TankService'

export default function WaterTank(props) {
    
    const {visibility} = props;
    const [tank, setTank] = useState([]);
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
      TankService.getTank(1).then((response) => {
        setTank(response.data)
      })
    }, []);

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
      
      const marks = [
          { value: 4, label: '0%', },
          { value: 26, label: '25%', },
          { value: 50, label: '50%', },
          { value: 75, label: '75%', },
          { value: 98, label: '100%',},
        ];
    
      const handleWateringPlants = x => {
        
      TankService.getTank(1).then((response) => {
          setTank(response.data);
          if (response.data.level > 5){
            TankService.watering().then(res => { 
  
            if(res.status===200){
                history.push({ pathname:'/management/watering/success', 
                state:  {background: location , 
                title: "Watering succesful", 
                topic: "Your plants has been watered."}});
              }
           
            }).catch((err)=>{

              if(err && err.response){
                switch(err.response.status){
                  default:
                    history.push({ pathname:'/management/watering/failed', 
                    state:  {background: location , 
                    title: "Watering failed", 
                    topic: "Level of water in the tank is to low to water plants. Please refill the tank."}});
                }}}
            )
          }
          else {
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
            { visibility ? (
                <Button variant="contained" 
                        color ='inherit' 
                        sx={{ backgroundColor: "#42a5f5"}}  
                        onClick = {handleWateringPlants}
                        size="medium">Water plants</Button>
            ) : ( <div/>) }
            </Grid>
            </React.Fragment>
  )
}
