import { Container, Button,	Grid,	Paper, Box,	TextField,	IconButton,	InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './signin.css';
import { Header, Footer, Spinner } from '../../components';
import { login, reset } from '../../features/auth/authSlice'
//import { Link } from 'react-router-dom';

const Signin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPass: false,
  });

  const { email, password } = formData
      
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }


  const handlePassVisibilty = () => {
    setFormData({
      ...formData,
      showPass: !formData.showPass,
    });
  };

	return (
		<div>
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
          <form onSubmit={onSubmit}>
            <Grid 
              container 
              direction="column" 
              spacing={2}>
              <Grid item>
                <TextField
                  type="email"
                  fullWidth
                  label="Email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  variant="filled"
                  required
                  onChange={onChange}
                  
                />
              </Grid>

              <Grid item>
              <TextField
                type={formData.showPass ? "text" : "password"}
                fullWidth
                label="Password"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                variant="filled"
                required
                onChange={onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handlePassVisibilty}
                        aria-label="toggle password"
                        edge="end"
                      >
                        {formData.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
        
              />
              </Grid>

              <Grid item>
                <Box textAlign="center">

                 {/* To Do: backend authentication before sign in */}

                  {/* <Link to={'/'}> */}
                    <Button
                      type="submit" 
                      variant="contained" 
                    >
                      Sign In
                    </Button>
                  {/* </Link> */}
                </Box>
              </Grid>
            </Grid>
          </form>
          </Paper>
        </Grid>
      </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Signin;