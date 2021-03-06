import React  from 'react'
import { useEffect, useState} from 'react'
import {Link, withRouter, useLocation} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {Container,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem } 
  from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Footer from '../Footer';
import Topic from '../Topic';
import PlantService from '../../Services/PlantService'
import PlantTile from '../Tiles/PlantTile';

// Stylowanie elementu
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 100,
  },
  select: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "0px solid #484850",
    borderRadius: "5px 5px 0 0"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "0px solid #484850"
    },
  }
}));

// Komponent wyświetlający strone do zarządzania roślinami
const PlantsPage = (props) => {

  // Aktualny adres URL
  let location = useLocation();

  // Zmienne przechowujące dane
  const [plants, setPlants] = useState([]);
  const [types] = useState([ 
    { id:0 , name: "All" },
    { id:1 , name: "Vegetable" },
    { id:2 , name: "Herb"},
    { id:3 , name: "Flower"},
    { id:4 , name: "Other"}
  ])
  const [value, setValue] = useState(0);
  const classes = useStyles();

  // Funkcja wykonywana podczas renderowania komponentu
  useEffect(() => {
      // Wywołanie żadania GET w celu uzyskania wszystkich roślin
      PlantService.getPlants().then((response) => {
        // Przypisanie danych do zmiennej plants
        setPlants(response.data);
    });
  }, []);

  // Metoda wywoływana w przypadku zwężenia wyszukiwania do konkretnego typu rośliny
  const handleChange = (event) => {
      setValue(event.target.value);
    // Wyświetlanie wszystkich rślin
    if (event.target.value === 0){
        PlantService.getPlants().then((response) => {
        setPlants(response.data);
      }
    )}
    // Wyświetlanie wszystkich warzyw
    if (event.target.value === 1){
      PlantService.getPlantsByType("Vegetable").then((res) => {
        setPlants(res.data);
      }
    )}
    // Wyświetlanie wszystkich ziół
    else if (event.target.value === 2){
      PlantService.getPlantsByType("Herb").then((res) => {
        setPlants(res.data);
      }
    )}
    // Wyświetlanie wszystkich kwiatów
    else if (event.target.value === 3){
      PlantService.getPlantsByType("Flower").then((res) => {
        setPlants(res.data);
      }
    )}
    // Wyświetlanie wszystkich innych roślin
    else if (event.target.value === 4){
      PlantService.getPlantsByType("Other").then((res) => {
        setPlants(res.data);
      }
    )}
  }

    return(
      <React.Fragment>
      <Topic title = "Collection of your plants" 
        text = "Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis."/>
      <Container disableGutters 
        maxWidth="md" 
        component="main" 
        sx={{ pb: 4}}>
        <Grid container spacing={2}>
        <Grid item xs={3}/>
        <Grid item xs={6} alignItems="flex-end">
         {/* Przycisk odpowiadający za wyświetlenie okna dialogowego do dodania nowej rośliny */}
        <Button variant="contained" 
              position="absolute"
              color = 'inherit' 
              sx={{ backgroundColor: "#F8D090",  alignItems: 'flex-end' }}
              fullWidth  
              size="medium"  
              component={Link}  
              to={{ pathname: `/plants/add/`,state: { background: location } }}>
              <AddIcon/>Add new plant</Button> 
        </Grid>
        <Grid item xs={3}> 
        <FormControl className={classes.formControl}
                     size="small" >
          <Select className={classes.select}
                  value={value}
                  sx={{ backgroundColor: "#F8D090"}}
                  onChange={(e) => handleChange(e)}>
          {/* Lista wszystkich typów roślin */}
          {types.map((type) => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))}
          </Select>
          </FormControl></Grid>
          </Grid>
      </Container>
      <PlantTile plants={plants} visibility = {true}/>
      <Container maxWidth={false} 
      sx ={{ pt: 4 , display:'flex', justifyContent:'center', alignItems:'center'}}  >
        <div>Icons made by 
          <Link style={{ color: '#000000' }} 
          to="/freepik" 
          title="Freepik"> macrovector, katemangostar and freepik</Link> / Freepik 
        </div>
      </Container>
      <Footer/>
      </React.Fragment>
    )
  }


export default withRouter(PlantsPage)
