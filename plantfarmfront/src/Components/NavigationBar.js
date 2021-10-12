import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import { Link as LinkRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


const sections = [
  { title: 'Plants', url: 'plants' },
  { title: 'Managment', url: 'managment' },
  { title: 'History', url: 'history' },
];

function NavigationBar() {

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Link href='main' underline="none" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}> Plant Farm</Link>
      </Toolbar>
      <CssBaseline />
      <AppBar fixed ="top" component="nav" position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: "#edeec9"}}>
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between', overflowX: 'auto' }}>
       {sections.map((section) => (
      <Link underline="none" color="text.primary" noWrap  key={section.title} variant="button" href={section.url} sx={{ p: 1, flexShrink: 0 }}>{section.title}</Link>
       ))}
       <Box sx={{ flexGrow: 1 }}/>
      <Button color = 'inherit' sx={{ alignItems: 'flex-end' , backgroundColor: "#A9C47F"}} variant="outlined" size="medium" component={LinkRouter} to={'/login'}> Login </Button>
      </Toolbar>
      </AppBar>
      <AppBar
      />
      
 
    </React.Fragment>
  );
}

export default NavigationBar;