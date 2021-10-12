
import * as React from 'react';
import Box from '@mui/material/Box';

import PlantsPage from './Components/Pages/PlantsPage';
import ManagmentPage from './Components/Pages/ManagmentPage';
import HistoryPage from './Components/Pages/HistoryPage';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import NavigationBar from './Components/NavigationBar';
import DeleteDialog from './Components/Dialogs/DeleteDialog'
import EditDialog from './Components/Dialogs/EditDialog'
import AddDialog from './Components/Dialogs/AddDialog'

import{ BrowserRouter as Router,
        Switch,
        Route,
        useLocation } 
        from "react-router-dom";

function Paths() {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
      <Route path ="/plants" exact component ={PlantsPage}/>
      <Route path ="/managment" exact component ={ManagmentPage}/>
      <Route path ="/history" exact component ={HistoryPage}/>
      <Route path ="/login" exact component ={LoginPage}/>
      <Route path ="/main" exact component ={MainPage}/>
      </Switch>

      {background && <Route path="/plants/edit/:id" children={<EditDialog/>} />}
      {background && <Route path="/plants/delete/:id" children={<DeleteDialog/>} />}
      {background && <Route path="/plants/add/" children={<AddDialog/>} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Box>
        <NavigationBar/>
        <Switch>
          <Paths/>
        </Switch>
      </Box>
    </Router>
  );
}

export default App;

