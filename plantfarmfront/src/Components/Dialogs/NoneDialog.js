import * as React from 'react';
import { withRouter} 
    from 'react-router-dom';

import DialogPage from './DialogPage';

const NoneDialog = (props) => {
    return (
      <React.Fragment>
        <DialogPage 
          title = {props.location.state.title}
          topic = {props.location.state.topic}
           >
        </DialogPage>
    </React.Fragment>
    );
  }
  
export default withRouter(NoneDialog);