import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import Footer from '../Footer';
import PlantTile from '../Tiles/PlantTile';
import Topic from '../Topic'
import Table from '../Table';
import PlantService from '../../Services/PlantService'

class MainPage extends React.Component{

    constructor(props){
        super(props)

    this.state = {
        plants: [] 
    }
    } 

    componentDidMount(){
      PlantService.getPlants().then((response) => {
      this.setState({plants: response.data});
      });
    }

    render(){
        return(
            <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Topic title ="Plants" text="Create you own plant collection. Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis." />
            <PlantTile plants={this.state.plants} visibility ={false}/>
            <Divider sx={{ pt: 1, pb: 6 }} />
            <Container maxWidth sx ={{ pt: 2, pb: 2 ,alignItems: 'flex-end' , backgroundColor: "#edeec9"}} >
            <Topic title ="Managment" text="Manage your plant crops from the control panel.You can monitor the condition of your plants on an ongoing basis and water them remotely." />
            </Container>
            <Topic title ="History" text=" Check the history of measurements made during plant growth and, based on them, choose the best growing conditions for the plants to ensure the best quality." />
            <Table/>
            <Footer/>
            </React.Fragment>
        )
        
    }
}
export default MainPage;