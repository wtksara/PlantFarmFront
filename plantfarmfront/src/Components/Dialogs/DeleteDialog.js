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

const DeleteDialog = (props) => {
 
  const { id } = props.match.params;
  const [ title, setTitle] = useState("Are you sure you want to delete this plant ?" );
  const [ topic, setTopic] = useState("Take into account that a plant that has been removed cannot be restored. ");
  const [ isFailed, setIsFailed] = useState(false);

  let history = useHistory();

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  const handleDelete = x => {
    PlantService.deletePlant(id).then(res => { 
        history.push('/plants');
        window.location.reload();
    }).catch((err)=>{

      if(err && err.response){
    
      switch(err.response.status){
        case 500:
          setTitle("Plant deleting failed");
          setTopic("Plant is still planted on the patch. You have to finished cultivation and then delete plant.");
          setIsFailed(true);
          break;
        default: 
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