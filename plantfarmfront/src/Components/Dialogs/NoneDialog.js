import * as React from 'react';
import { withRouter} 
    from 'react-router-dom';

import DialogPage from './DialogPage';

// Komponent wykorzystujący DialogPage do wyświetlania prostych komunikatów
const NoneDialog = (props) => {
    return (
      <React.Fragment>
        <DialogPage 
          title = {props.location.state.title}
          topic = {props.location.state.topic} >
        </DialogPage>
    </React.Fragment>
    );
  }
  
export default withRouter(NoneDialog);