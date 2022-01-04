import * as React from 'react';
import {DialogActions, 
        Button } 
        from '@mui/material';
import {withRouter, 
        useHistory} 
        from 'react-router-dom';

import DialogPage from './DialogPage';
import PatchService from '../../Services/PatchService'

// Komponent wykorzystujący DialogPage do wyświetlanie dialogu wyboru uprawy rośliny
const SelectDialog = (props) => {

  // Przekazanie do komponentu id plantacji oraz id rośliny
  const { patchid, plantid } = props.match.params;
  // Dostęp do histori w celu nawigacji
  let history = useHistory();

  // Metoda wywoływana po kliknieciu w przycisk
  const handleSelect = x => {
        // Wywołanie żadania PUT w celu aktualizacji 
        PatchService.updatePatch(patchid, plantid).then(res => { 
          // W przypadku powodzenia operacji przekierowanie z powrotem do zakładki zarządzanie
            history.push('/management');
            window.location.reload();
        })
  }
    
  return (
    <React.Fragment>
      <DialogPage 
       title = "Select plant for patch" 
       topic = "Are you sure you want to choose that plant for this patch ?"> 
        <DialogActions>
          <Button 
          autoFocus 
          variant="contained" 
          color ='inherit' 
          onClick={handleSelect}
          sx={{ backgroundColor: "#F4B752"}}  
          size="medium">
          Select</Button>
        </DialogActions>
      </DialogPage>
    </React.Fragment>
    );
  }

export default withRouter(SelectDialog);