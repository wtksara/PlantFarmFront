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

const initial = {
  id: 0,
  amountOfDays: 0,
}

const EndDialog = (props) => {
  const { id } = props.match.params;
  const [ amount, setAmount]= useState(props.location.state.amountOfDays);
  const [ values, setValues] = useState(initial);

  let history = useHistory();
  const topic = "It has left " + (amount - values.amountOfDays) +  " days to end cultivation" ;

  useEffect(() => {
    PatchService.getPatchById(id).then((res) => {
        setValues(res.data);
    }
    )
  }, []);


  const handleEnd = x => {
    PatchService.endPatch(id).then(res => { 
        history.push('/managment');
        window.location.reload();
    })
  }


    return (
     
      <React.Fragment>
      <DialogPage 
        title = "Are you sure you want to end cultivation ?" 
        topic = {topic}> 
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