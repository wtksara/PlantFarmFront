import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';



export default function DialogPage (props){

    
    const {title ,children, openForm, setOpenForm} = props;

    const handleClose = () => {
        setOpenForm(false);
      };

    return (
        <div>
        <Dialog open = {openForm} onClose={handleClose} maxWidth="md">
            <DialogTitle>
               <div> 
                   <Typography variant="h6" component="div">
                       {title}
                   </Typography>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
        </div>
    )
}