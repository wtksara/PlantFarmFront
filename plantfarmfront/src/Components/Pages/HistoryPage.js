import * as React from 'react';
import { CssBaseline,
         GlobalStyles }
         from '@mui/material';

import Footer from '../Footer';
import Topic from '../Topic';
import Table from '../Table';
import CultivationService from '../../Services/CultivationService';
import history from '../../history';
import Button from '@mui/material/Button';

class HistoryPage extends React.Component {

  constructor(props){
    super(props)

  this.state = {
    cultivations: [],
  }
  } 

  componentDidMount(){
    CultivationService.getAllCultivations().then((response) => {
    this.setState({cultivations: response.data});
    });
  
  }

  logOut=()=>{
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }

  render() {
    return (
    <React.Fragment>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    <CssBaseline/>
    <React.Fragment>
    <Topic 
      title = "History" 
      text = "Check the history of measurements made during plant growth and, based on them, choose the best growing conditions for the plants to ensure the best quality."/>
    <Table cultivations = {this.state.cultivations}/>
    </React.Fragment> 
    <Footer/>
    </React.Fragment>
    );
  }
}

export default HistoryPage;
