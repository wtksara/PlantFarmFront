import  React, 
        {useState} 
        from 'react';
import { DialogActions, 
         Button} 
         from '@mui/material';
import { withRouter, 
         useHistory} 
         from 'react-router-dom';

import DialogPage from './DialogPage';
import PlantService from '../../Services/PlantService'

// Komponent wykorzystujący DialogPage do obsługi usunięcia danej rośliny z bazy
const DeleteDialog = (props) => {
 
  // Przekazanie do komponentu id rośliny
  const { id } = props.match.params;
  // Przypisanie treści komunikatów wstępnych
  const [ title, setTitle] = useState("Are you sure you want to delete this plant ?" );
  const [ topic, setTopic] = useState("Take into account that a plant that has been removed cannot be restored. ");
  // Zmienna przechowująca stan operacji
  const [ isFailed, setIsFailed] = useState(false);
  
  // Dostęp do histori w celu nawigacji
  let history = useHistory();

  // Powrót do poprzedniej strony
  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  // Obsługa operacji próby usunięcia danej rośliny z bazy
  const handleDelete = x => {
    // Wywołanie żadania DELETE
    PlantService.deletePlant(id).then(res => { 
        // W przypadku udanej operacji przekierowanie do strony zawierącej całą bazę roślin
        history.push('/plants');
        window.location.reload();
    // W przypadku nieudanej operacji obsługa błędu poprzez wyświetenie odpowiedniego komunikatu informującego 
    }).catch((err)=>{

      if(err && err.response){
  
      switch(err.response.status){
        case 500:
        // W przypadku próby usunięcia rośliny, która nadal jest uprawiana na plantacji
          setTitle("Plant deleting failed");
          setTopic("Plant is still planted on the patch. You have to finished cultivation and then delete plant.");
          setIsFailed(true);
          break;
        default: 
        // W przypadku błedu podczas próby usuniecia
          setTitle("Plant deleting failed");
          setTopic("Something went wrong try again.");
          setIsFailed(true);
          break;
    }
    }});
  }

    return (
      <React.Fragment>
      <DialogPage 
      title = {title}
      topic = {topic}>
        <DialogActions>
           {/* Odpowiednie przyciski wyświetlane w zależności od stanu operacji usuwania */}
          {!isFailed ? 
          (<Button 
            autoFocus 
            variant="contained" 
            color ='inherit' 
            onClick={handleDelete}
            sx={{ backgroundColor: "#F4B752"}}  
            size="medium">
            Delete </Button>)
          :
          (<Button 
            autoFocus 
            variant="contained" 
            color ='inherit' 
            onClick={back}
            sx={{ backgroundColor: "#F4B752"}}  
            size="medium">
            Ok </Button>)
          }
        </DialogActions>
      </DialogPage>
  </React.Fragment>
    );
  }
  
export default withRouter(DeleteDialog);