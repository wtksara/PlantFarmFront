import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Topic from './Topic';
import Button from '@mui/material/Button';

export default function WaterTank(props) {
    
    const {visibility} = props;

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

        return(
            <React.Fragment>
            <Topic title ="Water tank" text="Check the condition of your plants in control panel. Based on the actual measurments and uncoming alerts decided if your plants need the water. " />
            <Grid align="center">
              <Box sx={{ height: 300 , ml:5}}>
                <CustomSlider
                disabled
                aria-label="Restricted values"
                defaultValue={50}
                orientation="vertical"
                step={25}
                valueLabelDisplay="auto"
                marks={marks}/>
              </Box>
            </Grid>
            <Grid align="center" sx={{ pt: 3 }}>
            { visibility ? (
                <Button variant="contained" color ='inherit' sx={{ backgroundColor: "#42a5f5"}}  size="medium"> Water plants</Button>
            ) :(
                <div/>
            ) }
            
            </Grid>
            </React.Fragment>
        )
}
