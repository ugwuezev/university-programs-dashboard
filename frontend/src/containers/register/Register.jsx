import { Container, Button,	Grid,	Paper, Box,	TextField,	IconButton,	InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './register.css';
import { Header, Footer, Spinner } from '../../components';
import { register, reset } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom';

const Register = () => {

    const [formData, setFormData] = useState({
        name:"",
        email: "",
        password: "",
        password2: "",
        showPass: false,
    });

    const { name, email, password, password2 } = formData
    
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
  
        if (password !== password2) {
          toast.error('Passwords do not match')
        } else {
          const userData = {
            name,
            email,
            password,
          }
    
          dispatch(register(userData))
        }
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
                    type="text"
                    fullWidth
                    label="Full Name"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your full name"
                    variant="outlined"
                    required
                    onChange={onChange}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type="email"
                    fullWidth
                    label="Email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    variant="outlined"
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
                    placeholder="Enter your desired password"
                    variant="outlined"
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
                  <TextField
                    type={formData.showPass ? "text" : "password"}
                    fullWidth
                    label="Password"
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm password"
                    variant="outlined"
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

                    <Link to={'/signin'}>
                      <Button
                        type="submit" 
                        variant="contained" 
                      >
                        Register
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

        <Footer />
      </div>
    );
};

export default Register;