import { useEffect, useState } from "react";
import axios from "axios";

const TweetFunction = ({ setData }) => {
    const [query] = useState("");
    const apiUrl = 'http://localhost:5000/tweets';
    
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(apiUrl);
        setData(res.data);
      };
      if (query.length === 0 || query.length > 2) fetchData();
    }, [query, setData]);
  
    return (
      <div>

      </div>
    );
  }
  
  export default TweetFunction;