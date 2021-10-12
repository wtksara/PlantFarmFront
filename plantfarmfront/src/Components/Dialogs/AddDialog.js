import * as React from 'react';

import DialogPage from './DialogPage';
import PlantForm from '../Forms/PlantForm';

export default function AddDialog() {
   
    return (
    <React.Fragment>
        <DialogPage 
        title = "Add new plant">
        <PlantForm/>
        </DialogPage>
    </React.Fragment>
    );
  }