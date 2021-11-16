import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import {withStyles}  from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


function Row(props) {
  const {row, number } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow style ={ number % 2? { background : "white" }:{ background : "#FCEED8" }} >
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left"> {row.id}</TableCell>
        <TableCell align="left">{row.plant.name}</TableCell>
        <TableCell align="left">{row.growPatch}</TableCell>
        <TableCell align="right"> {row.finished ? 
         (  <CheckBoxIcon/>) : (<CheckBoxOutlineBlankIcon/>)}
        </TableCell>
      </TableRow>

      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="measurement">
                <TableHead style ={{ background : "#F8D090" }}>
                  <TableRow>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="right">Humidity [%]</TableCell>
                    <TableCell align="right">Temperature [°C]</TableCell>
                    <TableCell align="right">Insolation [%]</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {row.measurements.map((measurementRow) => (
                    <TableRow key={measurementRow.date}>
                      <TableCell> {measurementRow.date}</TableCell>
                      <TableCell align="right">{measurementRow.humidity}</TableCell>
                      <TableCell align="right">{measurementRow.temperature}</TableCell>
                      <TableCell align="right">{measurementRow.insolation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>

        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>

        <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>

        <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

const CollapsibleTable = (props) => {

    const [rowNumber, setRowNumber] = React.useState(0);
    const {cultivations} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cultivations.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    function getAndSetRowNumber(rowNumber){
      var previousRowNumber = rowNumber;
      setRowNumber(previousRowNumber+1)
      return previousRowNumber;
    }


  return (
      
    <Container disableGutters  maxWidth="md" component="main" sx={{ pt: 2, pb: 2 }}>
    <TableContainer component={Paper}>
      <Table  sx={{ minWidth: 300 }} aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: "#F8D090"}}>
          <TableRow > 
            <TableCell align="left" />
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Plant</TableCell>
            <TableCell align="left">Patch</TableCell>
            <TableCell align="right">Finished</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >  
          {(rowsPerPage > 0  ? cultivations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : cultivations)
          .map((cultivation,i) => (
            <Row key={cultivation.id} row={cultivation} number={i}/>
          ))}
        </TableBody>
        <TableFooter sx={{ backgroundColor: "#F8D090"}}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={cultivations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Container>
  );
}
export default CollapsibleTable