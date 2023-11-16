import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from "axios"
import { useNavigate } from "react-router-dom";

// import useNavigate from "react-dom" 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function Login() {


  const navigate = useNavigate()

  const [email,setEmail] =useState(null);
  const [password,setPassword] = useState(null);


  const handleEmail = (e)=>setEmail(e.target.value);
  const handlePassword = (e)=>setPassword(e.target.value);



  

  const handleSubmit =async (e) => {
    // console.log("handlesubmitt");
    e.preventDefault()
   try {
    const response = await axios.post('http://localhost:5000/auth/login',{email,password})
    console.log(response.data,"logged in");
    if (response.data) {
      // <h1>Welcome{response.data.firstName}</h1>
      navigate("/createProfile")
console.log("blooooogggggg");
    }else{
      console.log("error to fetch response");
    }
   } catch (error) {
    console.log(error.message,"lllllllllllllllllllllllllll");
   }
  //  const jsonString = JSON.stringify( handleSubmit, 2);
  };

  return (
 

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleEmail}
              autoComplete="email"
              autoFocus
              />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={handlePassword}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
              >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}