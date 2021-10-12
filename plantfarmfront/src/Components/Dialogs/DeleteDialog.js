import * as React from 'react';
import { DialogActions, 
         Button } 
         from '@mui/material';

import DialogPage from './DialogPage';

export default function DeleteDialog() {
 
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
          sx={{ backgroundColor: "#F4B752"}}  
          size="medium">
          Delete </Button>
        </DialogActions>
      </DialogPage>
  </React.Fragment>
    );
  }