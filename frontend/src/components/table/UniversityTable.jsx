import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Avatar } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const UniversityTable = ({ data }) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              S/N
            </StyledTableCell>
            <StyledTableCell align="left">
              FULL NAME
            </StyledTableCell>
            <StyledTableCell align="center">
              TWITTER AVI
            </StyledTableCell>
            <StyledTableCell align="left">
              TWITTER NAME
            </StyledTableCell>
            <StyledTableCell align="left">
              TWITTER HANDLE
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item, index) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell align="center" component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.full_name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Avatar
                      src = {item.twitter_avi_link}
                      alt = "university avi"
                      sx={{ width: 70, height: 70}}
                    />
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.twitter_name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.twitter_handle}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UniversityTable;