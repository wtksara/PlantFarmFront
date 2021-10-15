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

    const PatchTile = (props) =>{
      let location = useLocation();
      const {patchs,visibility} = props;
    
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };
    
    function setMarks(patch){
      var marks= [ 
          { value: 0, label: "0",},
          { value: parseInt(patch.timeOfGrowth)*0.25, label: (parseInt(patch.timeOfGrowth)*0.25).toString(),},
          { value: parseInt(patch.timeOfGrowth)*0.50, label: (parseInt(patch.timeOfGrowth)*0.50).toString(),},
          { value: parseInt(patch.timeOfGrowth)*0.75, label: (parseInt(patch.timeOfGrowth)*0.75).toString(),},
          { value: parseInt(patch.timeOfGrowth)*1, label: (parseInt(patch.timeOfGrowth)*1).toString(),},
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
      if (patch.error == 0 ) {
        return "#A9C47F";
      } 
      else if (patch.error == 1 ) {
        return "#d00000";
      } 
      else {
        return "#e85d04";
      }
    
    }

    function CreateAlert(props) {
      if (props.patch.error == 0 ) {
        return <Grid sx={{ pb:6.5}}/>;
      } 
      else if (props.patch.error == 1 ) {
        return <Alert sx={{ borderLeft: 4, borderRight:4 , borderTop: 0 ,borderBottom: 4, borderColor : alertColor(props.patch), borderStyle: 'solid'}} severity="error">This is an error message!</Alert>;
      } 
      else {
        return <Alert sx={{ borderLeft: 4, borderRight:4 , borderTop: 0 ,borderBottom: 4, borderColor : alertColor(props.patch), borderStyle: 'solid'}} severity="warning">This is an warning message!</Alert>;
      }
     
    }


    return (
      <React.Fragment>
      <Container maxWidth="md" component="main" sx={{ pt: 0, pb: 8 , backgroundColor: "#ffffff" }} >
      <Grid container spacing={2} mt ={0.5} alignItems="flex-end"> 
      {patchs.map((patch) => (
        <Grid item key={patch.id}  xs={12} sm={6} md={4} >
         
      {patch.isEmpty ? 
      (
        <Card sx={{ borderLeft: 4, borderRight:4 ,borderTop: 4, borderBottom: 4, borderColor : "#b08968", borderStyle: 'solid'}}> 
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} >
        <Toolbar sx={{ backgroundColor: "#e6ccb2"}}>
          <Grid container spacing={2} alignItems="center"  >
            <Grid item xs >
               <CardHeader title={"Empty patch"} subheader={"Choose the type"} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center', }} />
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
        <InputLabel id="info-label">Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={1}>Tommato</MenuItem>
          <MenuItem value={2}>Cucumber</MenuItem>
          <MenuItem value={3}>Pumpkin</MenuItem>
        </Select>
        </FormControl>
         ) 
         :
         (<Grid item xs  sx={{pt: 7.5}}/>) 
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
                >
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
               <CardHeader title={patch.title} subheader={patch.type} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center', }} />
           </Grid>
           </Grid>
         </Toolbar>
         </AppBar>
        <CardContent sx={{ backgroundColor: "#ffffff"}}>
            <Grid container spacing = {1} alignItems="flex-end">
              <Grid item>
                <Typography variant="h2" align="center" >{patch.temperature}°C</Typography>
              </Grid>
              <Grid item>
              <CardMedia  image={sun}  style={{ height:70 , width : 85}} />
              </Grid>
            </Grid>
            <Grid container spacing ={2} sx={{ pb:5 }} alignItems="flex-end">
              <Grid item>
                <Typography variant="h6" align="center" > Humidity: {patch.humidity} %</Typography>
              </Grid>
            </Grid>
            <CustomSlider
            aria-label="Always visible"
            disabled 
            defaultValue={patch.actualDay}
            step={5}
            marks={setMarks(patch)}
            max={0}
            max={patch.timeOfGrowth}
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
                to={{ pathname: `/managment/patchs/delete/${patch.key}`,state: { background: location } }}>
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
      < CreateAlert patch = {patch}/>
      </Grid>
      ))}
      </Grid>
      </Container>
      </React.Fragment>

    )
}
export default PatchTile;

