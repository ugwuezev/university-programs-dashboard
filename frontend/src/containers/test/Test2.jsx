import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

const Test = () => {

    const [sampleData, setSampleData] = useState([])

    useEffect(() => {
      setSampleData(sampleData)

    }, [])
    
    const SortFunction = () => {
        const sortedData = [...sampleData].sort((a,b) => {
            return a.first > b.first ? 1 : -1
        })
        setSampleData(sortedData)
    }

let navigate = useNavigate();

    return (
        <div>
            <div>
                <Button onClick={() => { navigate("/signin"); }} >
                    Texting
                </Button>
            </div>

            <div>
                <Link to={'/'}>
                    <Button
                        type="submit" 
                        variant="contained" 
                    >
                        Sign In
                    </Button>
                 </Link>
            </div>

        </div>

    );
}

export default Test;