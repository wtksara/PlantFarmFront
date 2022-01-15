import React from 'react';
import {Container,
    Link,
    } 
    from '@mui/material';

import WaterTank from '../WaterTank';
import Footer from '../Footer';
import Topic from '../Topic';
import PatchService from '../../Services/PatchService'
import PatchTile from '../Tiles/PatchTile';

// Komponent wyświetlający strone do zarządzania uprawami na plantacjach
class ManagementPage extends React.Component {

    // Utworzenie zmiennych
    constructor(props){
      super(props)
      this.state = {
          patches: []
      }
  }

    // Metoda jest wykonywana poczas tworzenia się komponentu
    componentDidMount(){
    // Wywołanie żadania GET w celu uzyskania wszystkich plantacji
    PatchService.getPatches().then((response) => {
        // Przypisanie danych do zmiennej patches
        this.setState({patches: response.data});
    });
    }
    
  render() {
    return(
        <React.Fragment>
        <Topic 
            title = "Your cultivations" 
            text = "Manage your plant crops from the control panel. You can monitor the condition of your plants on an ongoing basis and water them remotely."/>
        <PatchTile patches={this.state.patches} 
            visibility ={true}/>
        <Container maxWidth={false} 
            sx ={{ pb: 4, display:'flex', justifyContent:'center', alignItems:'center'}}  >
            <div>Icons made by 
            <Link style={{ color: '#000000' }} 
            to="/freepik" 
            title="Freepik"> macrovector, katemangostar and freepik</Link> / Freepik 
            </div>
        </Container>
        <Container maxWidth={false} sx ={{ pb: 4, alignItems: 'flex-end', backgroundColor: "#edeec9"}} >
            <WaterTank visibility ={true}/>
        </Container>
        <Footer/>
        </React.Fragment>
        )
  }
}
export default ManagementPage