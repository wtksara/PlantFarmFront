import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import Slider from '@mui/material/Slider';
import { withStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Image from "material-ui-image";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import sun from './sun.jpg';
import PlantService from '../../Services/PlantService'

import { useEffect,
         useState} from 'react'
         
const initial = [{
  id: 0,
  name: "",}
]

const PatchTile = (props) =>{
    let location = useLocation();
    const {patches, visibility} = props;
    const [values, setValues] = useState(initial);
    const [patchOne, setPatchOne] = React.useState(0);
    const [patchTwo, setPatchTwo] = React.useState(0);
    const [patchThree, setPatchThree] = React.useState(0);
    


    function handleChange(id, event) {
        if (id == 1) return setPatchOne(event.target.value);
        else if (id == 2) return setPatchTwo(event.target.value);
        else if (id == 3)  return setPatchThree(event.target.value);
    }

    function whichPatch(id){
      if (id == 1) return patchOne;
      else if (id ==2)  return patchTwo; 
      else if (id ==3)return  patchThree;   
    }

    
    useEffect(() => {
      PlantService.getPlants().then((res) => {
          setValues(res.data);
      }
      )
    }, []);

    function setMarks(patch){
      
      var marks= [ 
          { value: 0, label: "0",},
          { value: parseInt(patch.amountOfDays*0.25), label: (parseInt(patch.amountOfDays*0.25)).toString(),},
          { value: parseInt(patch.amountOfDays*0.50), label: (parseInt(patch.amountOfDays*0.50)).toString(),},
          { value: parseInt(patch.amountOfDays*0.75), label: (parseInt(patch.amountOfDays*0.75)).toString(),},
          { value: patch.amountOfDays, label: (parseInt(patch.amountOfDays)*1).toString(),},
        ]
      return marks
    }

    const CustomSlider = withStyles({
      thumb: { backgroundColor: "#A9C47F",},
      active: { backgroundColor: "#A9C47F",},
      track: { color: "#A9C47F"},
      rail: { color: "#001d3d"}
    })(Slider);
    
  


    function alertColor(patch){
      var temperatureDifference = patch.actualTemperature - patch.temperature;
      var humidityDifference = patch.actualHumidity - patch.humidity;
  
      if (temperatureDifference > 10 ) {
          if (humidityDifference > 10 )
            return "#d00000" 
          else if (humidityDifference >5)
            return "#d00000" 
          else 
            return "#d00000"
      }
      else if (temperatureDifference > 5) { 
          if (humidityDifference > 10 )
            return "#d00000" 
          else if (humidityDifference >5)
           return "#e85d04" 
         else 
           return  "#e85d04" 
      }
      else {
        if (humidityDifference > 10 )
          return  "#d00000" 
        else if (humidityDifference > 5)
          return  "#A9C47F" 
        else
          return  "#A9C47F" 
      }
    }

    function CreateAlert( props ) {
        return <Alert sx={{ borderLeft: 4, borderRight:4 , borderTop: 0 ,borderBottom: 4, borderColor : props.color, borderStyle: 'solid'}} severity = {props.type}> {props.text}</Alert>;  
    }

    function CheckAlert (props){
      var temperatureDifference = props.patch.actualTemperature - props.patch.temperature;
      var humidityDifference = props.patch.actualHumidity - props.patch.humidity;
  
      if (temperatureDifference > 10 ) {
          if (humidityDifference > 10 )
            return <CreateAlert color = "#d00000" type = "error"  text= "Temperature and humidity are definitely to high !"/>
          else if (humidityDifference > 5)
            return <CreateAlert color = "#d00000" type = "error"  text= "Temperature is to high ! Humidity is above the average. "/>
          else 
            return <CreateAlert color = "#d00000" type = "error"  text= " Temperature is definitely to high !"/>
      }
      else if (temperatureDifference > 5) { 
          if (humidityDifference > 10 )
            return <CreateAlert color = "#d00000" type = "error"  text= "Temperature is above average. Humidity is to high!"/>
          else if (humidityDifference > 5)
           return <CreateAlert color = "#e85d04" type = "warning"  text= "Temperature and humidity are above the average."/>
         else 
           return <CreateAlert color = "#e85d04" type = "warning"  text= "Temperature is above the average. "/>
      }
      else {
        if (humidityDifference > 10 )
          return <CreateAlert color = "#d00000" type = "error"  text= "Humidity is to definitely high!"/>
        else if (humidityDifference > 5)
          return <CreateAlert color = "#A9C47F" type = "warning"  text= "Humidity is above the average."/>
        else
          return <Grid sx={{ pb:5}}/>;
      }

    }

   
    
    return (
      <React.Fragment>
      <Container maxWidth="md" component="main" sx={{ pt: 0, pb: 8 , backgroundColor: "#ffffff" }} >
      <Grid container spacing={2} mt ={0.5} alignItems="flex-end"> 
      {patches.map((patch) => (
        <Grid item key={patch.patchId}  xs={12} sm={6} md={4} >
      {patch.plantName == null ? 
      (
        <Card sx={{ borderLeft: 4, borderRight:4 ,borderTop: 4, borderBottom: 4, borderColor : "#b08968", borderStyle: 'solid'}}> 
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} >
        <Toolbar sx={{ backgroundColor: "#e6ccb2"}}>
          <Grid container spacing={2} alignItems="center"  >
            <Grid item xs >
               <CardHeader title={"Empty patch"} subheader={"Choose the plant"} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center', }} />
           </Grid>
           </Grid>
         </Toolbar>
         </AppBar>   
         <CardContent sx={{ backgroundColor: "#ffffff", pt: 12.5}}>
         <Grid container spacing={2} alignItems="center"  >
         <Grid item xs>
         {visibility ? 
          ( 
         <FormControl fullWidth>
        <InputLabel id="info-label">Plant</InputLabel>
        <Select
          label="Select"
          onChange={(e) => handleChange(patch.patchId, e)}
        >
          {values.map((value) => (
          <MenuItem value={value.id}>{value.name}</MenuItem>
          ))}
        </Select>
        </FormControl>
         ) 
         :
         (<Grid item xs sx={{pt: 7.5}}/>) 
         }  
        </Grid>
        </Grid>
        </CardContent>
        <CardActions sx={{ backgroundColor: "ffffff", pt: 12}}>
          <Grid container spacing ={2} alignItems="flex-end">
          <Grid item xs={4}/>
          <Grid item xs={8}>
          {visibility ? 
          ( 
          <Button 
                variant="outlined" 
                variant="contained" 
                color = 'inherit' 
                sx={{ backgroundColor: "#b08968"}} 
                fullWidth  
                size="medium" 
                component={Link} 
                key={patch.id} 
                to={{ pathname: whichPatch(patch.patchId) != 0 ? `/management/patches/${patch.patchId}/plants/${whichPatch(patch.patchId)}` : `/management/patches/none`,
                 state: { background: location , title: "Plant has not been selected for that patch", topic: " You have to select plant to start cultivation"}}} >
                Select type</Button> 
          ) 
          :
          (<div/>) 
          }  
            </Grid>    
            </Grid>
        </CardActions>
        </Card>


      ) 
      :
      (
        <Card sx={{ borderLeft: 4, borderRight:4 ,borderTop: 4, borderBottom: 4, borderColor : alertColor(patch), borderStyle: 'solid'}}> 
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} >
        <Toolbar sx={{ backgroundColor: "#edeec9"}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs >
               <CardHeader title={patch.plantName} subheader={patch.plantType} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center', }} />
           </Grid>
           </Grid>
         </Toolbar>
         </AppBar>
        <CardContent sx={{ backgroundColor: "#ffffff"}}>
            <Grid container spacing = {1} alignItems="flex-end">
              <Grid item>
                <Typography variant="h2" align="center" >{patch.actualTemperature}°C</Typography>
              </Grid>
              <Grid item>
              <CardMedia  image={sun}  style={{ height:70 , width : 85}} />
              </Grid>
            </Grid>
            <Grid container spacing ={2} sx={{ pb:5 }} alignItems="flex-end">
              <Grid item>
                <Typography variant="h6" align="center" > Humidity: {patch.actualHumidity} %</Typography>
              </Grid>
            </Grid>
            <CustomSlider
            aria-label="Always visible"
            disabled 
            defaultValue={patch.actualAmountOfDays}
            step={5}
            marks={setMarks(patch)}
            max={0}
            max={patch.amountOfDays}
            valueLabelDisplay="on"
          />
          <Grid>
          <Typography variant="subtitle1" align="center" > Time of growth</Typography>
          </Grid>
          </CardContent>
          <CardActions sx={{ backgroundColor: "ffffff"}}>
          <Grid container spacing ={2} alignItems="flex-end">
          <Grid item xs={4}/>
          <Grid item xs={8}>
          {visibility ? 
          ( 
          <Button 
                variant="outlined" 
                variant="contained" 
                color = 'inherit' 
                sx={{ backgroundColor: "#adc178"}} 
                fullWidth  
                size="medium" 
                component={Link} 
                key={patch.key} 
                to={{ pathname: `/management/patches/delete/${patch.patchId}`,state: { background: location , amountOfDays : patch.amountOfDays}}}>
                End cultivation</Button>  
            ) 
            :
            (<div/>) 
            }    
            </Grid>    
            </Grid>
            </CardActions>
            </Card>
            
      )}

      <CheckAlert patch = {patch}/>
      </Grid>
      ))}
      </Grid>
      </Container>
      </React.Fragment>

    )
}
export default PatchTile;

