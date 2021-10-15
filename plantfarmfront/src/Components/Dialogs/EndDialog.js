import * as React from 'react';
import { DialogActions, 
         Button } 
         from '@mui/material';

import DialogPage from './DialogPage';

export default function EndDialog() {
 
    return (
      <React.Fragment>
      <DialogPage 
        title = "Are you sure you want to end cultivation ?" 
        topic = " It has left x days to grow">
        <DialogActions>
          <Button 
          autoFocus 
          variant="contained" 
          color ='inherit' 
          sx={{ backgroundColor: "#F4B752"}}  
          size="medium">
          End </Button>
        </DialogActions>
      </DialogPage>
  </React.Fragment>
    );
  }