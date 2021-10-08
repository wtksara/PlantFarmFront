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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
const EditPlantPage = (props) =>{
   
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <React.Fragment>
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
      </React.Fragment>
    )
}

export default EditPlantPage;