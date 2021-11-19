
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
import ProtectedRoute from './ProtectedRoute'
import{ BrowserRouter as Router,
        Switch,
        Route,
        useLocation,
        Redirect } from 'react-router-dom'; 

function Paths() {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
      <ProtectedRoute exact  path ="/plants" component ={PlantsPage}/>
      <ProtectedRoute exact path ="/management" component ={ManagementPage}/>
      <ProtectedRoute path ="/history" exact component ={HistoryPage}/>
      <Route path ="/login" exact component ={LoginPage}/>
      <Route path ="/" exact component ={MainPage}/>
      <Route path='/freepik' component={() => { window.location.href = 'https://www.freepik.com'; return null;}}/>
      <Redirect from="*" to="/" />
      </Switch>

      {background && <ProtectedRoute path="/plants/add/" children={<AddDialog/>} />}
      {background && <ProtectedRoute path="/plants/edit/:id" children={<EditDialog/>} />}
      {background && <ProtectedRoute path="/plants/delete/:id" children={<DeleteDialog/>} />}
      {background && <ProtectedRoute path="/management/patches/delete/:id" children={<EndDialog/>} />}
      {background && <ProtectedRoute path="/management/patches/:patchid/plants/:plantid" children={<SelectDialog/>} />}
      {background && <ProtectedRoute path="/management/patches/none" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/login/failed" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/plants/add/failed" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/plants/delete/failed" children={<NoneDialog/>} />}


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

