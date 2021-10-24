import * as React from 'react';

import { withRouter} 
    from 'react-router-dom';

import {useState} from 'react';

import DialogPage from './DialogPage';


const NoneDialog = (props) => {
    const [ title, setTitle]= useState(props.location.state.title);
    const [ topic, setTopic]= useState(props.location.state.topic);

    return (
      <React.Fragment>
        <DialogPage 
          title = {title}
          topic = {topic}
           >
        </DialogPage>
    </React.Fragment>
    );
  }
export default withRouter(NoneDialog);