import React from 'react';
import {GlobalStyles,
    CssBaseline,
    Container,
    Link } 
    from '@mui/material';

import WaterTank from '../WaterTank';
import Footer from '../Footer';
import Topic from '../Topic';
import PatchService from '../../Services/PatchService'
import TankService from '../../Services/TankService'
import PatchTile from '../Tiles/PatchTile';

class ManagementPage extends React.Component {

    constructor(props){
      super(props)
      this.state = {
          patches: [] ,
          tank:[],
      }
  }
 
  componentDidMount(){
    PatchService.getPatches().then((response) => {
        this.setState({patches: response.data});
    });
    TankService.getTank().then((response) => {
        this.setState({tank: response.data});
    });  
    }
    
  render() {
    return(
        <React.Fragment>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <React.Fragment>
        <Topic 
            title = "Your cultivations" 
            text = "Manage your plant crops from the control panel. You can monitor the condition of your plants on an ongoing basis and water them remotely."/>
        <PatchTile patches={this.state.patches} 
            visibility ={true}/>
        <Container maxWidth={false} 
            sx ={{ pb: 4, display:'flex', justifyContent:'center', alignItems:'center'}}  >
            <Link style={{ color: '#000000'}} 
            to="https://www.freepik.com"
            title="Freepik"> Icons designed by macrovector / Freepik </Link> 
        </Container>
        <Container maxWidth={false} sx ={{ pb: 4, alignItems: 'flex-end', backgroundColor: "#edeec9"}} >
            <WaterTank tank = {this.state.tank} visibility ={true}/>
        </Container>
        </React.Fragment>
        <Footer/>
        </React.Fragment>
        )
  }
}
export default ManagementPage