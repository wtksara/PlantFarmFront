import Container from '@mui/material/Container';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import PlantsPage from './Components/PlantsPage';
import ManagmentPage from './Components/ManagmentPage';
import HistoryPage from './Components/HistoryPage';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import NavigationBar from './Components/NavigationBar';
import Box from '@mui/material/Box';

function App() {
  return (
     <Router>
      <Box>
        <NavigationBar/>
          <Switch>
            <Route path ="/plants" exact component ={PlantsPage}/>
            <Route path ="/managment" exact component ={ManagmentPage}/>
            <Route path ="/history" exact component ={HistoryPage}/>
            <Route path ="/login" exact component ={LoginPage}/>
            <Route path ="/main" exact component ={MainPage}/>
          </Switch>
      </Box>
    </Router>
  );
}

export default App;

