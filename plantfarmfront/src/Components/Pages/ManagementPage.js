import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import PatchTile from '../Tiles/PatchTile';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { withStyles } from '@mui/styles';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


import WaterTank from '../WaterTank';
import Footer from '../Footer';
import Topic from '../Topic';
import PatchService from '../../Services/PatchService'
import TankService from '../../Services/TankService'
import history from '../../history';

class ManagementPage extends React.Component {

    constructor(props){
      super(props)
      this.state = {
          patches: [] ,
          tank:[],
          showContent : localStorage.getItem('USER_KEY'),
      }
  }
 
  componentDidMount(){
    if (this.state.showContent != null) {
    PatchService.getPatches().then((response) => {
        this.setState({patches: response.data});
    });
    TankService.getTank().then((response) => {
        this.setState({tank: response.data});
    });
    }
    else { 
    history.push('/login');
    window.location.reload();
    }
}
  render() {
        let show = this.state.showContent
        return(
            <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            { show != null ? (
            <Topic title = "Your cultivations" 
            text = "Manage your plant crops from the control panel. You can monitor the condition of your plants on an ongoing basis and water them remotely."/>
            ):
            (<div/> )}
            { show != null ? (
            <PatchTile patches={this.state.patches} visibility ={true}/>
            ):
            (<div/> ) }
             { show != null ? (
            <Container maxWidth sx ={{ pb: 4 ,alignItems: 'flex-end' , backgroundColor: "#edeec9"}} >
            <WaterTank tank = {this.state.tank} visibility ={true}/>
            </Container>
            ):
            (<div/> ) }
            <Footer/>
            </React.Fragment>
        )
  }
    
}
export default ManagementPage