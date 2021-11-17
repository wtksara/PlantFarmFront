import React  from 'react'
import {Link, withRouter} from "react-router-dom";
import {Container,
  Button,
  Grid } 
  from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Footer from '../Footer';
import Topic from '../Topic';
import PlantService from '../../Services/PlantService'
import PlantTile from '../Tiles/PlantTile';


class PlantsPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      plants: [] ,
      openForm: false,
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
      <Topic 
        title = "Collection of your plants" 
        text = "Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis."/>
      <Container disableGutters 
        maxWidth="xs" 
        component="main" 
        sx={{  pb: 4 }}>
        <Grid alignItems="flex-end">
        <Button variant="outlined" 
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
      <Container maxWidth={false} 
      sx ={{ pt: 4 , display:'flex', justifyContent:'center', alignItems:'center'}}  >
        <div>Icons made by 
          <Link style={{ color: '#000000' }} 
          to="https://www.freepik.com" 
          title="Freepik"> Freepik </Link> from 
          <Link style={{ color: '#000000'}} 
          to="https://www.flaticon.com/" 
          title="Flaticon">www.flaticon.com</Link>
        </div>
      </Container>
      <Footer/>
      </React.Fragment>
    )
  }
};

export default withRouter(PlantsPage)
