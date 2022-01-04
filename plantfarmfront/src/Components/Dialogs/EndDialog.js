import * as React from 'react';
import { DialogActions, 
         Button } 
         from '@mui/material';
import { withRouter, 
         useHistory} 
         from 'react-router-dom';
import { useEffect,
         useState} from 'react';

import DialogPage from './DialogPage';
import PatchService from '../../Services/PatchService'

// Początkowy stan
const initial = {
  id: 0,
  amountOfDays: 0,
}
// Komponent wykorzystujący DialogPage do obsługi zakończenia uprawy danej rośliny na plantacji
const EndDialog = (props) => {

  // Przekazanie do komponentu id plantacji
  const { id } = props.match.params;
  // Zmienna przechowująca informacje o plantacji
  const [ values, setValues] = useState(initial);

  // Dostęp do histori w celu nawigacji
  let history = useHistory();

  // Zmienna przechowująca ilość dni do zakończenia uprawy lub o ile została przekroczona uprawa
  let timeOfGrowth = props.location.state.amountOfDays - values.amountOfDays;

  // Ustawienie odpowiedniego komunikatu w zależności od sytuacji 
  function topicTitle(){
    if (timeOfGrowth >0) return "It has left " + timeOfGrowth +  " days to end cultivation" ;
    else if (timeOfGrowth === 0) return "It is end of cultivation" ;
    else return "Cultivation time has been extended by " + Math.abs(timeOfGrowth) + " days";
  }
 
  // Funkcja wykonywana podczas renderowania komponentu
  useEffect(() => {
    // Wywołanie żadania GET
    PatchService.getPatchById(id).then((res) => {
        // Przypisanie danych o danej plantacji do zmiennej values
        setValues(res.data);
    })}
    , []);

  // Metoda wywoływana po kliknieciu w przycisk
  const handleEnd = x => {
    // Wywołanie żadania PUT
    PatchService.endPatch(id).then(res => { 
        // W przypadku powodzenia operacji przekierowanie z powrotem do zakładki zarządzanie
        history.push('/management');
        window.location.reload();
    })
  }

    return (
      <React.Fragment>
      <DialogPage 
        title = "Are you sure you want to end cultivation ?" 
        topic = {topicTitle()}> 
        <DialogActions>
          <Button 
          autoFocus 
          variant="contained" 
          color ='inherit' 
          onClick={handleEnd}
          sx={{ backgroundColor: "#F4B752"}}  
          size="medium">
          End </Button>
        </DialogActions>
      </DialogPage>
  </React.Fragment>
    );
  }

  export default withRouter(EndDialog);