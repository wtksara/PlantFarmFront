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
    showContent : localStorage.getItem('USER_KEY'),
  }
  } 

  componentDidMount(){
    if (this.state.showContent != null) {
    CultivationService.getAllCultivations().then((response) => {
    this.setState({cultivations: response.data});
    });
    }
    else { 
     history.push('/login');
     window.location.reload();
    }
  }

  logOut=()=>{
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }

  render() {
    let show = this.state.showContent
    return (
    <React.Fragment>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    <CssBaseline/>
    { show != null ? (
    <Topic 
      title = "History" 
      text = "Check the history of measurements made during plant growth and, based on them, choose the best growing conditions for the plants to ensure the best quality."/>
      ):
      (<div/> )}
    { show != null ? (
    <Table cultivations = {this.state.cultivations}/>
    ):
    (<div/> )}
    <Footer/>
    </React.Fragment>
    );
  }
}

export default HistoryPage;
