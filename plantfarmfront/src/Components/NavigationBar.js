import * as React from 'react';
import { Link as LinkRouter, useHistory } from 'react-router-dom';
import {Toolbar,
        Button,
        AppBar,
        Link,
        Box,
        CssBaseline}
        from '@mui/material';

// Zmienna przechowująca zakładki dla paska nawigacyjnego
const sections = [
  { title: 'Plants', url: 'plants' },
  { title: 'Management', url: 'management' },
  { title: 'History', url: 'history' },
];

// Komponent odpowiedzialny za wyświelenie paska nawigacyjnego
function NavigationBar() {

   // Dostęp do histori w celu nawigacji
  let history = useHistory();

  // Metoda wywoływana w przypadku chęci wylogowania się użytkownika
  const handleLogout = x => {
    // Usuniecie tokenu lokalnie na komputerze użytkownika
    localStorage.removeItem("USER_KEY");
    // Przekierowanie do strony logowania
    history.push('/login');
    window.location.reload();
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Link href='/' 
              underline="none" 
              variant="h5" 
              color="inherit" 
              align="center" 
              noWrap sx={{ flex: 1 }}> Plant Farm</Link>
      </Toolbar>
      <CssBaseline/>
      <AppBar fixed ="top" 
              component="nav" 
              position="static" 
              color="default" 
              elevation={0} 
              sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: "#edeec9"}}>
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between', overflowX: 'auto' }}>
      {/* Wyświetlenie poszczególnych zakładek */}
      {sections.map((section) => (
        <Link underline="none" 
              color="text.primary" 
              noWrap  
              key={section.title} 
              variant="button" 
              href={section.url} 
              sx={{ p: 1, flexShrink: 0 }}>{section.title}</Link>
       ))}
      <Box sx={{ flexGrow: 1 }}/>
      {/* Sprawdzenie czy token istnieje. Jeśli tak to wyświetlany jest przycisk wylogowania się, jeśli nie to logowania */}
      {localStorage.getItem('USER_KEY') == null ? 
      ( <Button color = 'inherit' 
                sx={{ alignItems: 'flex-end' , backgroundColor: "#A9C47F"}} 
                variant="outlined" 
                size="medium" 
                component={LinkRouter} 
                to={'/login'}> Login </Button>
      ) : (
      <Button color = 'inherit' 
              sx={{ alignItems: 'flex-end' , backgroundColor: "#A9C47F"}} 
              variant="outlined" 
              size="medium" 
              onClick ={() => handleLogout()} > Log out </Button>)
      }
      </Toolbar>
      </AppBar>
      <AppBar/>
    </React.Fragment>
  );
}

export default NavigationBar;