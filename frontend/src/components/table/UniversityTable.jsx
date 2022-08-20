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

const UniversityTable = ({ setData, data }) => {
  
  // handling pagination
  const [initPage, setPage] = useState(0);
  const [searchResultPage, setSearchResultPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // handling search function
  const [q, setQ] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchParam] = useState(["full_name", "twitter_name", "twitter_handle"]);
  
  const search = (data) => {
    
    const searchResult = data.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
          .toString()
          .toLowerCase()
          .indexOf(q.toLowerCase()) > -1
        );
      });
    });

    //console.log(data);
    //console.log(searchResult, "searchResult");
    setFilteredData(searchResult);
  }

  const fetchData = async () => {
    const apiUrl = `http://localhost:5000/universities`;
    const res = await axios.get(apiUrl);
    setData(res.data);
    //setFilteredData(res.data);
  };

  useEffect(() => {
    fetchData();

  }, []);

  useEffect(() => {
    setSearchResultPage(0)
    search(data)
  
  }, [q]);

  //console.log(filteredData,"filteredData");
  const page = q ? searchResultPage : initPage;

  return (
    <div className="ut_content">
      <div>
        <span className="ut_search_bar">
          <input
            className="ut_search_input"
            placeholder="Search University"
            onChange={(e) => setQ(e.target.value)}
            value={q}
          />
          <div className="ut_addnew">  
            <MyButton path="/universities" name="Add New University" />
          </div>
        </span>
      
        {/* <div className="ut_addnew">
          <MyButton path="/universities" name="Add New University" />
        </div> */}
      </div>
      
      <div className="ut_table">
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
                <StyledTableCell align="left">
                  TWITTER AVI
                </StyledTableCell>
                <StyledTableCell align="left">
                  TWITTER NAME
                </StyledTableCell>
                <StyledTableCell align="left">
                  TWITTER HANDLE
                </StyledTableCell>
                <StyledTableCell align="center">
                  ACTION
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(q ? filteredData : data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {((page) * rowsPerPage) + index + 1}
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
            count={q ? filteredData.length : data.length}
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

export default UniversityTable;