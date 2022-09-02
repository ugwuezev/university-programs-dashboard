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
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
//import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';

//modal
import { AddKeywordModal, EditKeywordModal } from '../../components';

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

const KeywordTable = ({ setData, data }) => {

  const [initPage, setPage] = useState(0);
  const [searchResultPage, setSearchResultPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [keywords, setKeywords] = useState(data);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

  //modal set values - for both add and edit
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
 
  //modal function - add keyword toggle
  const addKeyword = () => {
    setToggleAdd(true)
  };

   //modal function - edit keyword toggle
  const editKeyword = () => {
    setToggleEdit(true)
  };

  //modal function - adding new keyword to the database
  const addNewKeyword = async(data) => {
    //console.log(data);
    //code here to add new keyword to database
    const addUrl = `http://localhost:5000/keywords`;

    await axios.post(addUrl, {
      name: data.name,
    }); 

    setToggleAdd(false);
  };

  //modal function - edit and update the keyword details
  const updateKeywordDetails = async(data) => {
    //console.log(data);
    //code here to update keyword details
    const editUrl = `http://localhost:5000/keywords/:_id`;

    await axios.put(editUrl, {
      name: data.name,
    });

    setToggleEdit(false);
  };


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
  const [searchParam] = useState(["name"]);
  
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

    setFilteredData(searchResult);
  }

  const fetchData = async () => {
    const apiUrl = `http://localhost:5000/keywords`;
    const res = await axios.get(apiUrl);
    setData(res.data);
    setKeywords(res.data);
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
		keywords.sort((keywordA, keywordB) => {

			if (sorted.reversed) {
				return keywordB.name.localeCompare(keywordA.name);
			}
			return keywordA.name.localeCompare(keywordB.name);
		});
		setData(keywords);
		setSorted({ sorted: "name", reversed: !sorted.reversed });
	};

  const renderArrow = () => {
		if (sorted.reversed) {
			return <FaArrowUp />;
		}
		return <FaArrowDown />;
	};

  return (

    <div className="kt_content">
      <div>
        <span className="kt_search_bar">

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
            className="kt_search_input"
            placeholder="Search Keyword"
            onChange={(e) => setQ(e.target.value)}
            value={q}
          />
         */}

          <div className="kt_addnew">
            <BigButton
              onClick={addKeyword}
              name="Add New Keyword"
            />
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
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={editKeyword}>Edit</Button>
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
      <AddKeywordModal open={toggleAdd} onClose={() => setToggleAdd(false)} addNewKeyword={addNewKeyword} />
      <EditKeywordModal open={toggleEdit} onClose={() => setToggleEdit(false)} updateKeywordDetails={updateKeywordDetails} />
    </div>
  );
};

export default KeywordTable;
