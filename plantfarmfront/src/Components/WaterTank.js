import React from 'react'
import { withStyles } from '@mui/styles';
import {Button ,
        Box,
        Slider,
        Grid }
  from '@mui/material';

import Topic from './Topic';

export default function WaterTank(props) {
    
    const {tank, visibility} = props;

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
          { value: 25, label: '25%', },
          { value: 50, label: '50%', },
          { value: 75, label: '75%', },
          { value: 96, label: '100%',},
        ];
      
        function tankValue(tank){
           var value = tank.level;
           switch (value) {
             case 0:
              return 0;
              break;
             case 1:
              return 25;
              break;
             case 2:
              return 50;
              break;
             case 3:
              return 75;
              break;
             case 4:
              return 100;
              break;
            default:
              break;
        }}

        return(
            <React.Fragment>
            <Topic title ="Water tank" 
                   text="Check the condition of your plants in control panel. Based on the actual measurments and uncoming alerts decided if your plants need the water. " />
            <Grid align="center">
              <Box sx={{ height: 300 , ml:5}}>
                <CustomSlider disabled
                        aria-label="Restricted values"
                        defaultValue={tankValue(tank)}
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
                        size="medium">Water plants</Button>
            ) : ( <div/>) }
            </Grid>
            </React.Fragment>
  )
}
