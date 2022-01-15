import React from 'react'
import { useEffect, useState} from 'react'
import { withStyles } from '@mui/styles';
import { Link, useLocation  } from "react-router-dom";
import {Button,
        Card,
        CardContent,
        CardHeader,
        CardMedia,
        CardActions,
        Grid,
        Container,
        Typography,
        Alert,
        Slider,
        AppBar,
        Toolbar,
        InputLabel,
        MenuItem,
        FormControl,
        ListSubheader,
        Select} 
        from '@mui/material';

// Images
import Sun from '../../Images/sun.png';
import SunWithCloud from '../../Images/sunWithCloud.png';
import Cloud from '../../Images/cloud.png';
import PlantService from '../../Services/PlantService'
import PatchService from '../../Services/PatchService'
import TankService from '../../Services/TankService'

// Zmienna inicjująca stan poczatkowy 
const initial = [{
  id: 0,
  name: "",}
]

  // Komponent odpowiedzialny za wyświelenie plantacji w postaci kafelków
const PatchTile = (props) =>{
  
    // Aktualny adres URL
    let location = useLocation();

     // Inicjalizacja zmiennych pomocniczych
    const {visibility} = props;
    const [patches, setPatches] = useState([]);
    const [lastUpdate, setLastUpdate] = useState();
    const [error, setError] = useState(false);
    const [herbs, setHerbs] = useState(initial);
    const [flowers, setFlowers] = useState(initial);
    const [vegetables, setVegetables] = useState(initial);
    const [others, setOthers] = useState(initial);
    const [insolation, setInsolation] = useState(0);
    const [patchOne, setPatchOne] = React.useState(0);
    const [patchTwo, setPatchTwo] = React.useState(0);
    const [patchThree, setPatchThree] = React.useState(0);
    const path = 'http://localhost:8080/api/plants/';

// Funkcja wykonywana podczas renderowania komponentu
    useEffect(() => {
      // Wywołanie żadania GET w celu uzyskania wszystkich plantacji
      PatchService.getPatches().then((response) => {
        // Zapisanie danych do zmiennej patches
        setPatches(response.data);
        
        // Sprawdzenie kiedy został wykonany ostatni pomiar na plantacjach
        response.data.map((patch) => {
          if (patch.date !=null){
            var now = new Date();
            var lastMeasurement = new Date(patch.date)
            var timeDifference = Math.abs(now.getTime() - lastMeasurement.getTime());
            if (lastMeasurement.getHours() !== 21 ){
            // Sprawdzenie czy czas od sporzadzenia pomiaru przekroczył 3 godziny
            if (timeDifference > 11700000) {// 3h and 15 min delay with measurement
              setLastUpdate(lastMeasurement.toLocaleString() + " Error:  Problems with connection, recheck all sensors.");
              setError(true);
            }
            else {
              setLastUpdate(lastMeasurement.toLocaleString());
              setError(false);
            }
            }
            else{
              if (timeDifference > 22500000) {// 6h and 15 min delay with measurement
                setLastUpdate(lastMeasurement.toLocaleString() + " Error:  Problems with connection, recheck all sensors.");
                setError(true);
              }
              else {
                setLastUpdate(lastMeasurement.toLocaleString());
                setError(false);
              }
            }
        }})
      });


      // Wywołanie żadań GET w celu uzyskania roślin o danych typach
      PlantService.getPlantsByType("Vegetable").then((res) => {
        setVegetables(res.data);
      })
      PlantService.getPlantsByType("Herb").then((res) => {
        setHerbs(res.data);
      })
      PlantService.getPlantsByType("Flower").then((res) => {
        setFlowers(res.data);
      })
      PlantService.getPlantsByType("Other").then((res) => {
        setOthers(res.data);
      })
      TankService.getTank(1).then((response) => {
          setInsolation(response.data)
      })
  
    }, []);

    
    // Stylwanie suwaka, tak aby przedstawiał czas uprawy rośliny
    const CustomSlider = withStyles({
      thumb: { backgroundColor: "#A9C47F",},
      active: { backgroundColor: "#A9C47F",},
      track: { color: "#A9C47F"},
      rail: { color: "#001d3d"}
    })(Slider);
    
    const CustomSliderAbove = withStyles({
      thumb: { backgroundColor: "#A9C47F",},
      active: { backgroundColor: "#FF0000 !important",},
      track: { backgroundColor: "#606c38 !important",
                border: "2px solid black",
              borderColor: "#606c38"
      },
      rail: { color: "#A9C47F",
            border: "2px solid black",
            borderColor: "#A9C47F"
    }
    })(Slider);


    // Funkcja obsługująca wybór rośliny na danej grządce
    function handleChange(id, event) {
        if (id === 1) return setPatchOne(event.target.value);
        else if (id === 2) return setPatchTwo(event.target.value);
        else if (id === 3)  return setPatchThree(event.target.value);
    }

    // Funkcja zwracająca numer grzadki
    function whichPatch(id){
      if (id === 1) return patchOne;
      else if (id === 2)  return patchTwo; 
      else if (id === 3) return  patchThree;   
    }

    // Funkcja odpowiadająca za ustawienie odpowiednich wartości na suwaku uprawy danej rośliny
    function setMarks(patch){
      var amount;
      // Sprawdzenie czy uprawa nie przedłuża się
      if (patch.actualAmountOfDays > patch.amountOfDays) amount =patch.actualAmountOfDays;
      else amount = patch.amountOfDays
      // Ustawienie odpowiednich proporcji na suwaku
      var marks= [ 
          { value: 0, label: "0",},
          { value: parseInt(amount*0.25), label: (parseInt(amount*0.25)).toString(),},
          { value: parseInt(amount*0.50), label: (parseInt(amount*0.50)).toString(),},
          { value: parseInt(amount*0.75), label: (parseInt(amount*0.75)).toString(),},
          { value: parseInt(amount), label: (parseInt(amount)).toString(),},
      ]
      return marks
    }

    // Funkcja odpowiadająca za zmiane koloru obramowania danego kafelka w zależności wartości pomiarów
    function alertColor(patch){
      // Sprawdzenie czy pomiar nie jest pusty
      if (patch.actualTemperature != null){
      // Obliczenie róznicy pomiedzy temperatura i wilgotnościa wymagana przez system, a uzyskana podczas pomiaru
      var temperatureDifference = patch.actualTemperature - patch.temperature;
      var humidityDifference = patch.actualHumidity - patch.humidity;
  
      // Jeśli pomiar jest zbyt wysoki, sygnalizowanie czerwonym kolorem
      if (temperatureDifference > 10 ) {
          if (humidityDifference > 10 ) return "#d00000" 
          else if (humidityDifference >5) return "#d00000" 
          else return "#d00000"
      }
      // Jeśli pomiar jest niewiele wyższy, sygnalizowanie pomarańczowym kolorem
      else if (temperatureDifference > 5) { 
          if (humidityDifference > 10 ) return "#d00000" 
          else if (humidityDifference >5) return "#e85d04" 
          else return  "#e85d04" 
      }
      // Jeśli pomiar jest zbyt niski, sygnalizowanie niebieskim kolorem
      else if (temperatureDifference < -5) return  "#0096c7" 
      else {
        if (humidityDifference > 10 ) return  "#d00000" 
        else if (humidityDifference > 5) return  "#A9C47F" 
        else if (humidityDifference < -5) return  "#0096c7"
        else return  "#A9C47F" 
      }
    }
      // Jeśli pomiar jest w granicach normy, pozostaw normalny kolor kafelka
      else return  "#A9C47F" 
    }

    // Wyświetlenie komunikatu o wybranym kolorze i treści
    function CreateAlert( props ) {
        return <Alert sx={{ borderLeft: 4, borderRight:4 , borderTop: 0 ,borderBottom: 4, borderColor : props.color, borderStyle: 'solid'}} severity = {props.type}> {props.text}</Alert>;  
    }

    // Funkcja odpowiadająca za wyświetlenie odpowiedniego komunikatu wraz z kolorem
    function CheckAlert (props){
      console.log(props.patch);
       // Sprawdzenie czy pomiar nie jest pusty
      if (props.patch.actualTemperature != null){
      // Obliczenie róznicy pomiedzy temperatura i wilgotnościa wymagana przez system, a uzyskana podczas pomiaru
      var temperatureDifference = props.patch.actualTemperature - props.patch.temperature;
      var humidityDifference = props.patch.actualHumidity - props.patch.humidity;
  
      // Jeśli pomiar jest zbyt wysoki, sygnalizowanie czerwonym kolorem oraz odpowiednim komunikatem
      if (temperatureDifference > 10 ) {
          if (humidityDifference > 10 )
            return <CreateAlert color = "#d00000" type = "error"  text= "Temperature and humidity are too high !"/>
          else if (humidityDifference > 5)
            return <CreateAlert color = "#d00000" type = "error"  text= "Temperature is too high ! Humidity is above average."/>
          else if (humidityDifference > -5)
            return <CreateAlert color = "#d00000" type = "error"  text= "Temperature is too high ! Humidity is too low "/>
          else 
            return <CreateAlert color = "#d00000" type = "error"  text= " Temperature is too high !"/>
      }
      // Jeśli pomiar jest niewiele wyższy, sygnalizowanie pomarańczowym kolorem oraz odpowiednim komunikatem
      else if (temperatureDifference > 5) { 
          if (humidityDifference > 10 )
            return <CreateAlert color = "#d00000" type = "error"  text= "Temperature is above average. Humidity is too high!"/>
          else if (humidityDifference > 5)
           return <CreateAlert color = "#e85d04" type = "warning"  text= "Temperature and humidity are above average."/>
          else if (humidityDifference < -5)
           return <CreateAlert color = "#e85d04" type = "warning"  text= "Temperature is above average. Humidity is too low "/>
         else 
           return <CreateAlert color = "#e85d04" type = "warning"  text= "Temperature is above the average. "/>
      }
       // Jeśli pomiar jest zbyt niski, sygnalizowanie niebieskim kolorem oraz odpowiednim komunikatem
      else if (temperatureDifference < -5 ) {
        if (humidityDifference > 10 )
          return <CreateAlert color = "#0096c7" type = "info"  text= "Temperature is too low. Humidity are too high !"/>
        else if (humidityDifference > 5)
          return <CreateAlert color = "#0096c7" type = "info"  text= "Temperature is too low ! Humidity is above average."/>
        else if (humidityDifference < -5)
          return <CreateAlert color = "#0096c7" type = "info"  text= "Temperature is too low. Humidity is too low "/>
        else 
          return <CreateAlert color = "#0096c7" type = "info"  text= " Temperature is too low !"/>
      }
      else {
        if (humidityDifference > 10 )
          return <CreateAlert color = "#d00000" type = "error"  text= "Humidity is too definitely high!"/>
        else if (humidityDifference > 5)
          return <CreateAlert color = "#A9C47F" type = "warning"  text= "Humidity is above the average."/>
        else if (humidityDifference < -5)
          return <CreateAlert color = "#0096c7" type = "info"  text= "Humidity is too low "/>
        else
          return <Grid sx={{ pb:5}}/>;
      }
    }
    // Jeśli pomiar jest w granicach normy, pozostaw normalny kolor kafelka i nie wyświetlaj komunikatu
    else return <Grid sx={{ pb:5}}/>;
    }

    // Wyświetlanie odpowiedniej grafiki o pogodzie w zależności od poziomu nasłonecznienia
    function Weather(insolation){
      if (insolation.insolation!= null){
        if (insolation.insolation > 75.00) return Sun
        else if (insolation.insolation > 50.00) return SunWithCloud
        else if (insolation.insolation >= 0.00) return Cloud
      }
      else return Sun
    }
    
    return (
      <React.Fragment>
      <Container maxWidth="md" 
        component="main" 
        sx={{ pt: 0, pb: 8 , backgroundColor: "#ffffff" }} >
      <Typography  variant={"subtitle1"} align='center'color = {error ? "#d00000" : 'black'} >Last updated: {lastUpdate} </Typography>
      <Grid container 
        spacing={2} 
        mt ={0.5} 
        alignItems="flex-end"> 
      {patches.map((patch, id) => (
        <Grid item key={id} 
        xs={12} 
        sm={6} 
        md={4} >
        {/* Wyświetlenie pustego kafelka jeżeli na danej plantacji nie została jeszcze rozpoczęta uprawa rośliny */} 
        {patch.plantName == null ? 
        (
        <Card sx={{ borderLeft: 4, borderRight:4 ,borderTop: 4, borderBottom: 4, borderColor : "#b08968", borderStyle: 'solid'}}> 
        <AppBar position="static" 
        color="default" elevation={0} 
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} >
        <Toolbar sx={{ backgroundColor: "#e6ccb2"}}>
          <Grid container spacing={2} 
            alignItems="center"  >
            <Grid item xs ={12}  >
               <CardHeader title={"Empty patch" } 
                      subheader={"Choose the plant"} 
                      titleTypographyProps={{ align: 'center' , pt: 0.5}} 
                      subheaderTypographyProps={{ align: 'center', pb: 0.5 }} />
           </Grid>
          </Grid>
        </Toolbar>
        </AppBar>   
        <CardContent sx={{ backgroundColor: "#ffffff", pt: 12}}>
        <Grid container spacing={2} 
          alignItems="center"  >
        <Grid item xs ={12} >
        {/* W przypadku gdy zawartość komponentu jest wyświetlana na stornie główniej brak możliwości wyboru uprawy nowej rośliny */}
        {visibility ? ( 
          <FormControl fullWidth>
          {/* Wybieranie nowej uprawy rośliny z listy wszystkich roślin posegregowanych po typach */} 
          <InputLabel>Plant</InputLabel>
          <Select
            label="Select"
            onChange={(e) => handleChange(patch.patchId, e)}>
          <ListSubheader style={{fontWeight: "bold", color: "#000000"}} >Vegetables</ListSubheader>
          {vegetables.map((value, id) => (
            <MenuItem key = {id} value={value.id}>{value.name}</MenuItem>
          ))}
           <ListSubheader style={{fontWeight: "bold", color: "#000000"}}  >Herbs</ListSubheader>
          {herbs.map((value, id) => (
            <MenuItem key = {id} value={value.id}>{value.name}</MenuItem>
          ))}
           <ListSubheader style={{fontWeight: "bold", color: "#000000"}}  >Flowers</ListSubheader>
          {flowers.map((value, id) => (
            <MenuItem key = {id} value={value.id}>{value.name}</MenuItem>
          ))}
           <ListSubheader style={{fontWeight: "bold", color: "#000000"}} >Others</ListSubheader>
          {others.map((value, id) => (
            <MenuItem key = {id} value={value.id}>{value.name}</MenuItem>
          ))}
          </Select>
          </FormControl>
        ) : (
          <Grid item xs ={12}  sx={{pt: 7.5}}/>) 
        }  
        </Grid>
        </Grid>
        </CardContent>
        <CardActions sx={{ backgroundColor: "ffffff", pt: 12}}>
          <Grid container spacing ={2} 
            alignItems="flex-end">
          <Grid item xs={4}/>
          <Grid item xs={8}>
          {/* W przypadku gdy zawartość komponentu jest wyświetlana na stornie główniej brak możliwości wyboru uprawy nowej rośliny */} 
          {visibility ? 
          ( <Button variant="contained" 
                color = 'inherit' 
                sx={{ backgroundColor: "#b08968"}} 
                fullWidth  
                size="medium" 
                component={Link} 
                to={{ 
                pathname: whichPatch(patch.patchId) !== 0 ?
                 `/management/patches/${patch.patchId}/plants/${whichPatch(patch.patchId)}` : `/management/patches/none`,
                state: { 
                  background: location , 
                  title: "Plant has not been selected for that patch", 
                  topic: " You have to select plant to start cultivation"}}} >
                Select type</Button> 
          ) : (<div/>) 
          }  
          </Grid>    
          </Grid>
        </CardActions>
        </Card>
      ) : (
        <Card sx={{ borderLeft: 4, borderRight:4 ,borderTop: 4, borderBottom: 4, borderColor : alertColor(patch), borderStyle: 'solid'}}> 
        <AppBar position="static" 
              color="default" 
              elevation={0} 
              sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} >
        <Toolbar sx={{ backgroundColor: "#edeec9"}}>
          <Grid container spacing={0} alignItems="center"> 
            <Grid item xs ={12} >
               {/* Wyświetlenie informacji o uprawie na danej plantacji */}
               <CardHeader title={
                          <React.Fragment>
                          <Grid container spacing={4} alignItems="flex-end">
                          <Grid item xs={2}>
                          <img src = {path.concat(patch.plantId,"/download")} alt="plantImage"  
                          style={{ display:'flex', justifyContent:'center', alignItems:'center',  height: '65px' , width: '65px'}} />
                          </Grid>
                          < Grid item xs={10}>
                          <Typography variant={"h5"} align='center' >{patch.plantName}</Typography>
                          <Typography variant={"subtitle1"} align='center' >{patch.plantType}</Typography>
                          </Grid>
                          </Grid>
                          </React.Fragment>
              } /> 
           </Grid>
          </Grid>
        </Toolbar>
        </AppBar>
        <CardContent sx={{ backgroundColor: "#ffffff"}}>
            <Grid container spacing = {1} 
                  alignItems="flex-end">
              <Grid item xs={9}>
              {/* Wyświetlenie ostatnio sporzadzonego pomiaru temperatury */}
                <Typography variant="h3" 
                        align="left">{patch.actualTemperature}°C</Typography>
              </Grid>
              <Grid item xs={3}>
              {/* Wyświetlenie grafiki informujacej o pogodzie na plantacji */}
              <CardMedia image={Weather(insolation)} 
                      align="right"   
                      style={{ height:60 , width : 60,  display: 'flex', justifyContent: 'flex-end' }} />
              </Grid>
              <Grid item>
              {/* Wyświetlenie ostatnio sporzadzonego pomiaru wilgotności */}
                <Typography variant="h6" align="left"> Humidity: {patch.actualHumidity} %</Typography>
              </Grid>
            </Grid>
            <Grid container spacing ={2} 
                sx={{ pb:5 }} 
                alignItems="left">
            <Grid item>
            </Grid>
            </Grid>
             {/* Wyświetlenie suwaka obrazującego czas wzrostu rośliny w zależności od ilości dni wzrostu */}
            {patch.actualAmountOfDays > patch.amountOfDays  ? 
            (<CustomSliderAbove track="inverted"
                        disabled 
                        defaultValue={[patch.amountOfDays, patch.actualAmountOfDays]}
                        step={5}
                        marks={setMarks(patch)}
                        max={ patch.actualAmountOfDays }
                        valueLabelDisplay="on"/>
            ):(
              <CustomSlider aria-label="Always visible"
                        disabled 
                        defaultValue={patch.actualAmountOfDays}
                        step={5}
                        marks={setMarks(patch)}
                        max={patch.amountOfDays}
                        valueLabelDisplay="on" />
            )}
          <Grid>
            <Typography variant="subtitle1" 
                      align="center" > 
            {patch.actualAmountOfDays > patch.amountOfDays ? "Time of growth extended" : "Time of growth"} </Typography>
          </Grid>
          </CardContent>
          <CardActions sx={{ backgroundColor: "ffffff"}}>
          <Grid container spacing ={2} 
                alignItems="flex-end">
          <Grid item xs={3}/>
          <Grid item xs={9}>
          {/* W przypadku gdy zawartość komponentu jest wyświetlana na stornie główniej brak możliwości zakończenia uprawy na danej plantacji */} 
          {visibility ? ( 
            <Button variant="contained" 
                color = 'inherit' 
                sx={{ backgroundColor: "#adc178"}} 
                fullWidth  
                size="medium" 
                component={Link} 
                key={patch.key} 
                to={{ pathname: `/management/patches/delete/${patch.patchId}`,state: { background: location , amountOfDays : patch.amountOfDays}}}>
                End cultivation</Button>  
          ) : (<div/>) 
          }    
          </Grid>    
          </Grid>
          </CardActions>
          </Card>     
      )}
      {/* Wyświetlenie odpowiedniego komunikatu jeżeli pomiar sporządzony przekracza wartość wymagana podczas wzrostu rośliny */} 
      <CheckAlert patch = {patch}/>
      </Grid>
      ))}
      </Grid>
      </Container>
      </React.Fragment>
    )
}
export default PatchTile;

