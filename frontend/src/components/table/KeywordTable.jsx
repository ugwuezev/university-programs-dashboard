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
import axios from "axios";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import "./table.css";
import { MyButton } from '../../components';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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


const KeywordTable = ({ setData, data }) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [q, setQ] = useState("");

  const [searchParam] = useState(["name"]);
  
  const search = (data) => {
    
    return data.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
          .toString()
          .toLowerCase()
          .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/keywords`);
      setData(res.data);
    };

    fetchData();
  }, [setData]);

  return (

    <div className="kt_content">
      <div>
        <span className="kt_search_bar">
          <input
            className="kt_search_input"
            placeholder="Search Keyword"
            onChange={(e) => setQ(e.target.value)}
            value={q}
          />
          <div className="kt_addnew">
            <input
              className="kt_search_input"
              placeholder="Add New Keyword"
            />
            <span className="kt_button" >
              <MyButton path="/keywords" name="Add" />
            </span>
          </div>
        </span>
      </div>

      <div className="kt_table">
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  S/N
                </StyledTableCell>
                <StyledTableCell align="left">
                  KEYWORD
                </StyledTableCell>
                <StyledTableCell align="center">
                  ACTION
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {search(data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
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
      </div>
    </div>
  );
};

export default KeywordTable;