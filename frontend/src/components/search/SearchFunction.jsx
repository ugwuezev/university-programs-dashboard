import { useEffect, useState } from "react";
import "./search.css";
import { SearchInput } from '../../components';
import axios from "axios";

const SearchFunction = ({setData, path, placeholder }) => {
    const [query, setQuery] = useState("");
    

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`http://localhost:5000${path}?q=${query}`);
        setData(res.data);
      };
      if (query.length === 0 || query.length > 2) fetchData();
    }, [path, query, setData]);
  
    return (
      <div>

        <div>
          <SearchInput onChange={(e) => setQuery(e.target.value.toLowerCase())} placeholder={placeholder} />
        </div>
          
      </div>
    );
  }
  
  export default SearchFunction;