import * as React from 'react';

import DialogPage from './DialogPage';
import PlantForm from '../Forms/PlantForm';
import PatchService from '../../Services/PatchService'

import {DialogActions, 
        Button } 
        from '@mui/material';

import {withRouter, 
        useHistory} 
        from 'react-router-dom';

const SelectDialog = (props) => {
    const { patchid, plantid } = props.match.params;
    let history = useHistory();

    const handleSelect = x => {
        PatchService.updatePatch(patchid, plantid).then(res => { 
            history.push('/managment');
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