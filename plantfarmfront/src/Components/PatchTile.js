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
import Divider from '@mui/material/Divider';

import plant from '../Images/plant.png'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import { withStyles } from '@mui/styles';
import { makeStyles } from '@mui/styles';
import Topic from './Topic';

const CustomSlider = withStyles({

  thumb: { 
            width: "200px !important",
            heigh: "50px !important",
            backgroundColor: "#42a5f5",},
  active: { 
            width: "200px", 
            border: "3px orange",
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
    {
      value: 4,
      label: '0%',
    },
    {
      value: 25,
      label: '25%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 75,
      label: '75%',
    },
    {
      value: 96,
      label: '100%',
    },
  ];

    const PatchTile = (props) =>{
        const {patchs} = props;
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

    const Item = styled(Paper)(({ theme }) => ({
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            backgroundColor: "#c5d7e9" ,
          }));
    
    return (
        <React.Fragment>
            <Container maxWidth sx ={{ pt: 2, pb: 8 ,alignItems: 'flex-end' , backgroundColor: "#edeec9"}} >
            <Topic title ="Water tank" text="Check the condition of your plants and water them if needed" />
            <Grid align="center">
            <Box sx={{ height: 300 , ml:5}}>
                <CustomSlider
                aria-label="Restricted values"
                defaultValue={100}
                orientation="vertical"
                step={25}
                valueLabelDisplay="auto"
                marks={marks}/>
            </Box>
            </Grid>
            <Grid align="center" sx={{ pt: 3 }}>
            <Button onClick={handleClose} autoFocus variant="contained" color ='inherit' sx={{ backgroundColor: "#42a5f5"}}  size="medium"> Water plants</Button>
            </Grid>
            </Container>
    
            <Container maxWidth="md" component="main" sx={{ backgroundColor: "#ffffff" }} >
            <Grid container spacing={5} alignItems="flex-end">
              {patchs.map((patch) => (
                    <Grid item key={patch.title} xs={12} sm={6} md={4} >
                       <Card sx={{ backgroundColor: "#65462a", pt: 1.25, pb: 1.25}}>
                        <Card sx={{ ml:1.25 , mr:1.25 }}>
                    
                    <CardHeader title={patch.title} subheader={patch.type} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center', }} sx={{ backgroundColor: "#A9C47F"}} />
                    <CardContent sx={{ backgroundColor: "#edeec9"}}>
                    <List sx={{ width: '100%', maxWidth: 360, backgroundColor: "#edeec9" }}>
      <ListItem  >
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Humiditity" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <WbSunnyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Temperature" secondary="75%" />
      </ListItem>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <WbSunnyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="" secondary="July 20, 2014" />
      </ListItem>
    </List>
                    </CardContent>
                  </Card>
                  </Card>
                </Grid>
              ))}
              
              </Grid>
         </Container>
          </React.Fragment>
        )

}


export default PatchTile;

