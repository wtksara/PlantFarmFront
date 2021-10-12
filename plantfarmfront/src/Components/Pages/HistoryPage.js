import * as React from 'react';
import { CssBaseline,
         GlobalStyles }
         from '@mui/material';

import Footer from '../Footer';
import Topic from '../Topic';
import Table from '../Table';

export default function HistoryPage() {
  return (
    <React.Fragment>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    <CssBaseline/>
    <Topic 
      title = "History" 
      text = "Check the history of measurements made during plant growth and, based on them, choose the best growing conditions for the plants to ensure the best quality."/>
    <Table/>
    <Footer/>
    </React.Fragment>
  );
}
