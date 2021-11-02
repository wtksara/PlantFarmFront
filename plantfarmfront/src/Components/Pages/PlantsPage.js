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
import history from '../../history';

class PlantsPage extends React.Component {

      constructor(props){
          super(props)
          this.state = {
              plants: [] ,
              openForm: false,
              showContent : localStorage.getItem('USER_KEY'),
          }
      }
     
      componentDidMount(){
      if (this.state.showContent != null) {
        PlantService.getPlants().then((response) => {
            this.setState({plants: response.data});
        });
      }
      else { 
        history.push('/login');
        window.location.reload();
        }
    }

    closeForm = () => { this.setState({ openForm: false });}

      render() {
    
        let show = this.state.showContent
        return(
            <React.Fragment>
              { show != null ? (
              <Topic title = "Collection of your plants" text = "Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis."/>
              ):
              (<div/> ) }
              <Container disableGutters maxWidth="xs" component="main" sx={{  pb: 4 }}>
              
              <Grid alignItems="flex-end">
              { show != null ? (
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
              ):
              (<div/> )
                }
              </Grid>
              
              </Container>
              
            { show != null ? (
            <PlantTile plants={this.state.plants} visibility = {true}/>
            ):
            (<div/> ) 
            }
            <Footer/>
            </React.Fragment>
        )
      }
};

export default withRouter(PlantsPage)
