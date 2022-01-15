import * as React from 'react';
import { Divider,
    Container} 
    from '@mui/material';

import Footer from '../Footer';
import PlantTile from '../Tiles/PlantTile';
import Topic from '../Topic'
import Table from '../Table';
import PlantService from '../../Services/PlantService'
import PatchService from '../../Services/PatchService'
import CultivationService from '../../Services/CultivationService'
import PatchTile from '../Tiles/PatchTile';
import WaterTank from '../WaterTank';

// Komponent wyświetlający strone główna
class MainPage extends React.Component{

    // Utworzenie zmiennych
    constructor(props){
        super(props)

    this.state = {
        plants: [] ,
        patches: [],
        cultivations: [],
    }
    } 

    // Metoda jest wykonywana poczas tworzenia się komponentu
    componentDidMount(){
      // Wywołanie żadania GET w celu uzyskania trzech pierwszych roślin
      PlantService.getShowPlants().then((response) => {
      // Przypisanie danych do zmiennej plants
      this.setState({plants: response.data});
      });
      // Wywołanie żadania GET w celu uzyskania wszystkich plantacji
      PatchService.getPatches().then((response) => {
      this.setState({patches: response.data});
      });
      // Wywołanie żadania GET w celu uzyskania wszystkich upraw
      CultivationService.getAllCultivations().then((response) => {
      this.setState({cultivations: response.data});
      });
    }
    
    render(){
        return(
            <React.Fragment>
            <Topic 
                title ="Plants" 
                text="Create you own plant collection. Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis." />
            <PlantTile 
                plants={this.state.plants} 
                visibility ={false}/>
            <Divider sx={{ pt: 1, pb: 6 , backgroundColor: "#ffffff"}} />
            <Container 
                maxWidth={false} 
                sx ={{ pt: 2, pb: 4 ,alignItems: 'flex-end' ,  backgroundColor: "#fefae0"}} >
                <Topic 
                title ="History" 
                text=" Check the history of measurements made during plant growth and, based on them, choose the best growing conditions for the plants to ensure the best quality." />
                <Table cultivations = {this.state.cultivations}/>
            </Container>
            <Container sx ={{ pt: 2, pb: 2 ,alignItems: 'flex-end' , backgroundColor: "#ffffff"}} >
                <Topic 
                title ="Managment" 
                text="Manage your plant crops from the control panel.You can monitor the condition of your plants on an ongoing basis and water them remotely." />
                <PatchTile 
                patches={this.state.patches} 
                visibility={false}/>
            </Container>
            <Container 
                maxWidth={false} 
                sx ={{ pb: 4 ,alignItems: 'flex-end' , backgroundColor: "#fefae0"}} >
                <WaterTank visibility ={false}/>
            </Container>
            <Footer/>
            </React.Fragment>
        )   
    }
}
export default MainPage;