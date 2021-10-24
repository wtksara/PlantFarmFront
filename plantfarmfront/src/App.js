
import * as React from 'react';
import Box from '@mui/material/Box';

import PlantsPage from './Components/Pages/PlantsPage';
import ManagementPage from './Components/Pages/ManagementPage';
import HistoryPage from './Components/Pages/HistoryPage';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import NavigationBar from './Components/NavigationBar';
import DeleteDialog from './Components/Dialogs/DeleteDialog'
import EditDialog from './Components/Dialogs/EditDialog'
import AddDialog from './Components/Dialogs/AddDialog'
import EndDialog from './Components/Dialogs/EndDialog'
import NoneDialog from './Components/Dialogs/NoneDialog'
import SelectDialog from './Components/Dialogs/SelectDialog'

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
      <Route path ="/management" exact component ={ManagementPage}/>
      <Route path ="/history" exact component ={HistoryPage}/>
      <Route path ="/login" exact component ={LoginPage}/>
      <Route path ="/" exact component ={MainPage}/>
      </Switch>

      {background && <Route path="/plants/edit/:id" children={<EditDialog/>} />}
      {background && <Route path="/plants/delete/:id" children={<DeleteDialog/>} />}
      {background && <Route path="/plants/add/" children={<AddDialog/>} />}
      {background && <Route path="/management/patches/delete/:id" children={<EndDialog/>} />}
      {background && <Route path="/management/patches/:patchid/plants/:plantid" children={<SelectDialog/>} />}
      {background && <Route path="/management/patches/none" children={<NoneDialog/>} />}
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

