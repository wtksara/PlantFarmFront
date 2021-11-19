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
  const [ values, setValues] = useState(initial);

  let history = useHistory();
  let timeOfGrowth = props.location.state.amountOfDays - values.amountOfDays;

  function topicTitle(){
    if (timeOfGrowth >0) return "It has left " + timeOfGrowth +  " days to end cultivation" ;
    else if (timeOfGrowth === 0) return "It is end of cultivation" ;
    else return "Cultivation time has been extended by " + Math.abs(timeOfGrowth) + " days";
  }

  useEffect(() => {
    PatchService.getPatchById(id).then((res) => {
        setValues(res.data);
    })}
    , []);


  const handleEnd = x => {
    PatchService.endPatch(id).then(res => { 
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