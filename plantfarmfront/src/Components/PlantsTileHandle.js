import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PlantForm from './PlantForm';
import DialogPage from './DialogPage';
  
const PlantsTileHandle = (props) =>{
   
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [openForm, setOpenForm] = useState(false)

    return (
        <React.Fragment>
        <Button variant="outlined" onClick = {() => setOpenForm(true)} variant="contained" color = 'inherit' sx={{ backgroundColor: "#adc178"}} fullWidth  size="medium">Edit</Button>
        <Button variant="outlined" onClick={handleClickOpen} variant="contained" color = 'inherit' sx={{ backgroundColor: "#F4B752"}} fullWidth  size="medium">Delete</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title"> {"Are you sure you want to delete this plant ?"} </DialogTitle>
        <DialogContent>
           <DialogContentText id="alert-dialog-description">
            Take into account that a plant that has been removed cannot be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus variant="contained" color ='inherit' sx={{ backgroundColor: "#F4B752"}}  size="medium"> Delete </Button>
        </DialogActions>
      </Dialog>
      <DialogPage title = "Edit plant" openForm = {openForm} setOpenForm = {setOpenForm}>
              <PlantForm/>
      </DialogPage>
      </React.Fragment>
    )
}

export default PlantsTileHandle;