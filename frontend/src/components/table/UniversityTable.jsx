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
import { BigButton } from '../../components';
import { Avatar } from '@mui/material';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
//import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';


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
  const [universities, setUniversities] = useState(data);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

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
    setUniversities(res.data);
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


  // sort function
  const sortByName = () => {
		universities.sort((universityA, universityB) => {

			if (sorted.reversed) {
				return universityB.full_name.localeCompare(universityA.full_name);
			}
			return universityA.full_name.localeCompare(universityB.full_name);
		});
		setData(universities);
		setSorted({ sorted: "name", reversed: !sorted.reversed });
	};

  const renderArrow = () => {
		if (sorted.reversed) {
			return <FaArrowUp />;
		}
		return <FaArrowDown />;
	};

  return (
    <div className="ut_content">
      <div>
        <span className="ut_search_bar">

          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search university"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e) => setQ(e.target.value)}
              value={q}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        

          {/* <input
            className="ut_search_input"
            placeholder="Search University"
            onChange={(e) => setQ(e.target.value)}
            value={q}
          />
          */}

          <div className="ut_addnew">  
            <BigButton path="/universities" name="Add New University" />
          </div>
        </span>
      
        {/* <div className="ut_addnew">
          <MyButton path="/universities" name="Add New University" />
        </div> 
        */}

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
                  <IconButton 
                    color="primary" 
                    sx={{ p: '10px' }} 
                    aria-label="directions"
                    onClick={sortByName}
                  >
                    <SortIcon />
                  </IconButton>
                  {sorted.sorted === "name"
									? renderArrow()
									: null}
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