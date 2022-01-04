import * as React from 'react';

import DialogPage from './DialogPage';
import PlantForm from '../Forms/PlantForm';

// Komponent wykorzystujący DialogPage do wyświetlania formularza do dodania nowej rośliny
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