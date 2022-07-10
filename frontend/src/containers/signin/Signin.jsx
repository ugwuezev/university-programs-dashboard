import { Container, Button,	Grid,	Paper, Box,	TextField,	IconButton,	InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import './signin.css';
import { Header } from '../../components';
import { Link } from 'react-router-dom';

const Signin = () => {

  const [values, setValues] = useState({
    email: "",
    pass: "",
    showPass: false,
  });

  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

	return (
		<div className="Signin">
     <div>
      <Header />
     </div>
     <div>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elelvation={2} sx={{ padding: 5 }}>
          <form>
            <Grid 
              container 
              direction="column" 
              spacing={2}>
              <Grid item>
                <TextField
                  type="email"
                  fullWidth
                  label="Username"
                  placeholder="Username"
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item>
              <TextField
                type={values.showPass ? "text" : "password"}
                fullWidth
                label="Password"
                placeholder="Password"
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handlePassVisibilty}
                        aria-label="toggle password"
                        edge="end"
                      >
                        {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </Grid>

              <Grid item>
                <Box textAlign="center">

                 {/* To Do: backend authentication before sign in */}

                  <Link to={'/'}>
                    <Button
                      type="submit" 
                      variant="contained" 
                    >
                      Sign In
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </form>
          </Paper>
        </Grid>
      </Container>
      </div>
    </div>
  );
};

export default Signin;