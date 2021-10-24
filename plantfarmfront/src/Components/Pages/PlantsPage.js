import React , {Component} from 'react'
import PlantTile from '../Tiles/PlantTile';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { setState } from "react";
import AddIcon from '@mui/icons-material/Add';

import PlantForm from '../Forms/PlantForm';
import DialogPage from '../Dialogs/DialogPage';
import Footer from '../Footer';
import Topic from '../Topic';
import PlantService from '../../Services/PlantService'
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';

class PlantsPage extends React.Component {

      constructor(props){
          super(props)
          this.state = {
              plants: [] ,
              openForm: false
          }
      }
     
      componentDidMount(){
        PlantService.getPlants().then((response) => {
            this.setState({plants: response.data});
        });
    }


    closeForm = () => { this.setState({ openForm: false });}

      render() {
        return(
            <React.Fragment>
              <Topic title = "Collection of your plants" text = "Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis."/>
              <Container disableGutters maxWidth="xs" component="main" sx={{  pb: 4 }}>
              <Grid alignItems="flex-end">
              <Button 
                      variant="outlined" 
                      variant="contained" 
                      position="absolute"
                      color = 'inherit' 
                      sx={{ backgroundColor: "#F8D090",  alignItems: 'flex-end' }}
                      fullWidth  
                      size="medium"  
                      component={Link}  
                      to={{ pathname: `/plants/add/`,state: { background: this.props.location } }}>
                      <AddIcon/>Add new plant</Button> 
              </Grid>
              </Container>
            <PlantTile plants={this.state.plants} visibility = {true}/>
            <Footer/>
            </React.Fragment>
        )
      }
};

export default withRouter(PlantsPage)
