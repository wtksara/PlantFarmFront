import React from 'react'
import { Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         Typography}
         from '@mui/material';
import { useHistory } from "react-router-dom";

export default function DialogPage(props)  {

    let history = useHistory();
  
    let back = e => {
      e.stopPropagation();
      history.goBack();
    };
  
    return (
        <div>
        <Dialog 
        open = {true} 
        onClose={back}>
            <DialogTitle 
                sx={{ alignItems: 'flex-end' , backgroundColor: "#A9C47F"}}>
               <div> 
                   <Typography 
                    variant="h6" 
                    component="div">
                    {props.title}
                   </Typography>
                   <Typography 
                    variant="h6" 
                    component="div">
                   </Typography>
                </div>
            </DialogTitle>
            <DialogContent 
                sx={{ backgroundColor: "#edeec9"}} 
                dividers>
                <DialogContentText 
                    id="alert-dialog-description">
                    {props.topic}
                </DialogContentText>
                    {props.children}
            </DialogContent>
        </Dialog>
        </div>
    )
    }

