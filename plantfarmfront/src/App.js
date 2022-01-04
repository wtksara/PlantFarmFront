
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

// Funkcja odpowiedzialna za zmiany stron
function Paths() {
  // Aktualny adres URL
  let location = useLocation();
  // Sposób wyświetlenia
  let background = location.state && location.state.background;

  return (
    <div>
      {/* Renderowanie odpowiedniego komponentu w zależności od ścieżki url */}
      <Switch location={background || location}>
      {/* Ściezki stron, które są dostepne jedynie po zalogowaniu */}
      <ProtectedRoute exact  path ="/plants" component ={PlantsPage}/>
      <ProtectedRoute exact path ="/management" component ={ManagementPage}/>
      <ProtectedRoute path ="/history" exact component ={HistoryPage}/>
      {/* Ściezki stron, które są dostepne bez logowania */}
      <Route path ="/login" exact component ={LoginPage}/>
      <Route path ="/" exact component ={MainPage}/>
      {/* Przekierowanie do strony z której wykorzystane zostały grafiki */}
      <Route path='/freepik' component={() => { window.location.href = 'https://www.freepik.com'; return null;}}/>
      <Redirect from="*" to="/" />
      </Switch>

      {/* Okno dialogu wyświetlane na tle strony, dostepne jedynie po zalogowaniu */}
      {background && <ProtectedRoute path="/plants/add/" children={<AddDialog/>} />}
      {background && <ProtectedRoute path="/plants/edit/:id" children={<EditDialog/>} />}
      {background && <ProtectedRoute path="/plants/delete/:id" children={<DeleteDialog/>} />}
      {background && <ProtectedRoute path="/management/patches/delete/:id" children={<EndDialog/>} />}
      {background && <ProtectedRoute path="/management/patches/:patchid/plants/:plantid" children={<SelectDialog/>} />}
      {background && <ProtectedRoute path="/management/patches/none" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/login/failed" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/plants/add/failed" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/plants/delete/failed" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/management/watering/failed" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/management/watering/success" children={<NoneDialog/>} />}
      {background && <ProtectedRoute path="/management/watering/process" children={<NoneDialog/>} />}
    </div>
  
  );
}

function App() {
  return (
    <Router>
      <Box>
        {/* Pasek nawigacyjny wyświetlany jest na każdej stronie */}
        <NavigationBar/>
        <Switch>
           {/* Zawartość strony się zmienia */}
          <Paths/>
        </Switch>
      </Box>
    </Router>
  );
}

export default App;

