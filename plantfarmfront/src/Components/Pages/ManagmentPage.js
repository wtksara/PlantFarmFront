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

class ManagmentPage extends React.Component {

    constructor(props){
      super(props)
      this.state = {
          patches: [] ,
      }
  }
 
  componentDidMount(){
    PatchService.getPatches().then((response) => {
        this.setState({patches: response.data});
    });
}
  render() {
        return(
            <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Topic title = "Your cultivations" 
            text = "Manage your plant crops from the control panel. You can monitor the condition of your plants on an ongoing basis and water them remotely."/>
             <PatchTile patches={this.state.patches} visibility ={true}/>
            <Container maxWidth sx ={{ pb: 4 ,alignItems: 'flex-end' , backgroundColor: "#edeec9"}} >
            <WaterTank visibility ={true}/>
            </Container>
            <Footer/>
            </React.Fragment>
        )
  }
    
}
export default ManagmentPage