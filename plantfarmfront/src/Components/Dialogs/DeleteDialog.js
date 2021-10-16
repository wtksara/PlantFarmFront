import * as React from 'react';
import { DialogActions, 
         Button } 
         from '@mui/material';
import { withRouter, 
         useHistory} 
         from 'react-router-dom';

import DialogPage from './DialogPage';
import PlantService from '../../Services/PlantService'

const DeleteDialog = (props) => {
 
  const { id } = props.match.params;
  let history = useHistory();

  const handleDelete = x => {
    PlantService.deletePlant(id).then(res => { 
        history.push('/plants');
        window.location.reload();
    })
  }


    return (
      <React.Fragment>
      <DialogPage 
        title = "Are you sure you want to delete this plant ?" 
        topic = " Take into account that a plant that has been removed cannot be restored. ">
        <DialogActions>
          <Button 
          autoFocus 
          variant="contained" 
          color ='inherit' 
          onClick={handleDelete}
          sx={{ backgroundColor: "#F4B752"}}  
          size="medium">
          Delete </Button>
        </DialogActions>
      </DialogPage>
  </React.Fragment>
    );
  }
  
export default withRouter(DeleteDialog);