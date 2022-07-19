import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

const Test = () => {

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