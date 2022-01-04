import * as React from 'react';
import { CssBaseline,
         GlobalStyles }
         from '@mui/material';

import Footer from '../Footer';
import Topic from '../Topic';
import Table from '../Table';
import CultivationService from '../../Services/CultivationService';

// Komponent wyświetlający strone zawierająca informację o historii pomiarów
class HistoryPage extends React.Component {

  // Utworzenie zmiennych
  constructor(props){
    super(props)

  this.state = {
    cultivations: [],
  }
  } 

  // Metoda jest wykonywana poczas tworzenia się komponentu
  componentDidMount(){
    // Wywołanie żadania GET w celu uzyskania wszystkich upraw
    CultivationService.getAllCultivations().then((response) => {
    // Przypisanie danych do zmiennej cultivations
    this.setState({cultivations: response.data});
    });
  
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
