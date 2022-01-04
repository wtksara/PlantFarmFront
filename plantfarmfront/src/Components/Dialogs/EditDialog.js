import * as React from 'react';

import DialogPage from './DialogPage';
import PlantForm from '../Forms/PlantForm';

// Komponent wykorzystujący DialogPage do wyświetlania formularza do ecji rośliny
export default function EditDialog() {
   
    return (
      <React.Fragment>
        <DialogPage 
          title = "Edit plant" >
          <PlantForm/>
        </DialogPage>
    </React.Fragment>
    );
  }