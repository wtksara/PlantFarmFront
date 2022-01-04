import React from 'react'
import { Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         Typography}
         from '@mui/material';
import { useHistory } from "react-router-dom";

// Główny komponent wykorzystywany przez inne komponenty oparte na dialogu
export default function DialogPage(props)  {

    // Dostęp do histori w celu nawigacji
    let history = useHistory();
  
    // Powrót do poprzedniej strony
    let back = e => {
      e.stopPropagation();
      history.goBack();
    };
  
    return (
        <div>
        {/* Utworzenie okna dialogowego */}
        <Dialog 
        open = {true} 
        onClose={back}>
            <DialogTitle 
                sx={{ alignItems: 'flex-end' , backgroundColor: "#A9C47F"}}>
               <div> 
                   <Typography 
                    variant="h6" 
                    component="div">
                    {/* Tytuł okna dialogowego */}
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
                    {/* Temat okna dialogowego */}
                    {props.topic}
                </DialogContentText>
                    {/* Zawartość okna dialogowego */}
                    {props.children}
            </DialogContent>
        </Dialog>
        </div>
    )
    }

