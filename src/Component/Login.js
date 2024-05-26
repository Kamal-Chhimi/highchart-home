import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Button, Checkbox, Divider, FormControlLabel, Grid, InputAdornment, Link, Paper, TextField, Typography,
} from '@mui/material';
import { AccountCircle, Email, FacebookOutlined, Google, Lock, LockOpen, LockOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundImage: 'url("https://zeevector.com/wp-content/uploads/Blue-Background-HD-Images.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    minHeight: '100vh',
    minWidth: '100vw',
    maxHeight:"100vh",
    maxWidth:"100vw",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedInput: {
    '&.Mui-focused': {
      backgroundColor: 'red', 
    },
  },
});

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [correctUsername, setCorrectUsername] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [login, setLogin] = useState(false);
  const [display, setDisplay] = useState('Login');
  const classes = useStyles();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      console.log('Logging in with:', username, password);
      clearInput();
      setLogin(true);

      setTimeout(() => {
        navigate('/page1');
      }, 1000);
    } else {
      setCorrectUsername(true);
      setCorrectPassword(true);
      setLogin(false);
    }
  };

  const handleSignup = () => {
    if (username !== '' && email !== '' && password !== '' && validatePassword(password)) {
      console.log('Signing up with:', username, email, password);
      setPasswordCorrect(false);
      clearInput();
      setDisplay('Login');
    } else {
      setPasswordCorrect(true);
    }
  };

  const handleCancel = () => {
    clearInput();
    setDisplay('Login');
  };

  const handleLoginLink = () => {
    clearInput();
    setDisplay('Login');
  };

  const handleSignupLink = () => {
    clearInput();
    setDisplay('Signup');
  };

  const handleForgetLink = () => {
    clearInput();
    setDisplay('Forget');
  };

  const clearInput = () => {
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const validatePassword = (input) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(input);
  };

  const paperStyle = {
    padding: '2%',
    boxShadow: '0px 0px 2vh rgba(0.9, 0.9, 0.9, 0.9)',
    minHeight: '70vh',
    maxHeight: '72vh',
    minWidth: '23vw',
    maxWidth: '23vw',
    background: '#e4e4f7',
    display: 'flex',
    flexDirection: 'column',
  };
  

  const avatarStyle = { background: "#1975d1" , width : "3vw" ,  height:"6vh" };
  const btStyle = { margin: '0.5vh 0vh', fontWeight: "bold", fontSize: "2vh" , height:"6vh" , padding:"0px" };

  return (
    <div className={classes.root}>
      {display === 'Login' && (
        <Grid container spacing={1} justifyContent="center">
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlined sx={{fontSize:"3.5vh",}} /></Avatar>
              <Typography  sx={{fontSize:"5vh" , marginBottom:"2vh"}}>Sign In</Typography>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' , margin:"0vh 0vh" , height:"8vh" }}>
              <TextField
                onChange={(e) => {
                  setUsername(e.target.value);
                  setCorrectUsername(false);
                }}
                
                
                
                value={username}
                fullWidth
                required
                placeholder='Enter Username'
                error={correctUsername}
                helperText={correctUsername && "Incorrect entry."}
                sx={{  margin:"1vh 0vh"}}
                InputLabelProps={{
                  style: {
                    fontSize:"2.3vh",
                  },
                }}
              

                InputProps={{
                  style: {
                    fontSize:"2.5vh",
                    height:"8vh"
                  },
                  onWheel: (e) => e.preventDefault(),
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: 'action.active' ,fontSize:"3.5vh", mr: 0, my:0 }} />
                    </InputAdornment>
                  ),
                }}
  
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' , margin:"0vh 0px" , height:"8vh" }}>
              <TextField
                onChange={(e) => {
                  setPassword(e.target.value);
                  setCorrectPassword(false);
                }}
                value={password}
                fullWidth
                required
                type='password'
                placeholder='Enter Password'
                error={correctPassword}
                helperText={correctPassword && "Incorrect entry."}

                InputLabelProps={{
                  style: {
                    fontSize:"2.3vh",
                    
                  },
                }}
              
                InputProps={{
                    style: {
                      fontSize:"2.5vh",
                      height:"8vh"
                    },
                    onWheel: (e) => e.preventDefault(),
                    startAdornment: (
                      <InputAdornment position="start">
                     {login ? <LockOpen sx={{ color: 'action.active', fontSize:"3.5vh" }} /> : <Lock sx={{ color: 'action.active',fontSize:"3.5vh" }} />}
                      </InputAdornment>
                    ),
                }}
              />
            </Box>
            
            <FormControlLabel
            sx={{height:"6vh"}}
             control={<Checkbox sx={{
              "& .MuiSvgIcon-root": {
                 fontSize: "3vh"
              } 
           }} name="checkedB" color='primary' />}
              label={<Typography sx={{ fontSize: "2.3vh" , padding:"0px" , margin:"0px"  }}>Remember me</Typography>}/>

            <Button style={btStyle} disabled={!username || !password} variant="contained" onClick={handleLogin} fullWidth color={login ? "success" : "primary"}>
              Login
            </Button>
            <Typography sx={{fontSize:"2vh", padding:"0px" , margin:"0px"}}  >
              <Link sx={{ ":hover": { cursor: "pointer" }  }} onClick={handleForgetLink}>Forget Password?</Link>
            </Typography>
            <Typography sx={{fontSize:"2.3vh" }}> Don't have an account? <Link sx={{ ":hover": { cursor: "pointer" } }} onClick={handleSignupLink}>Register now</Link></Typography>
            <Divider><Typography sx={{fontSize:"2.3vh" }} textAlign="center">Or</Typography></Divider>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Button style={btStyle} variant="contained" fullWidth color='primary'>
                <FacebookOutlined  sx={{ fontSize:"3.5vh", mr: 1, my: 0.5 }} />
                LogIn with Facebook
              </Button>
              <Button style={btStyle} variant="outlined" fullWidth color='primary'>
                <Google sx={{  fontSize:"3.5vh", mr: 1, my: 0.5 }} />
                Login with Google
              </Button>
            </Box>
          </Paper>
        </Grid>
      )}
      {display === 'Signup' && (
        <Grid container spacing={1} justifyContent="center">
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlined /></Avatar>
              <Typography variant='h4'>Sign Up</Typography>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                variant="standard"
                value={username}
                fullWidth
                required
                placeholder='Enter Username'
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                type='email'
                fullWidth
                required
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="standard"
                value={email}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordCorrect(!validatePassword(e.target.value));
                }}
                label="Password"
                variant="standard"
                value={password}
                fullWidth
                required
                type='password'
                placeholder='Enter Password'
                error={passwordCorrect}
                helperText={passwordCorrect && "Minimum 8 characters, one letter, one number, and one special character."}
              />
            </Box>

            <Button style={btStyle} disabled={!username || !password || !email} variant="contained" onClick={handleSignup} fullWidth color="primary">
              Signup
            </Button>
            <Typography> Already have an account? <Link sx={{ ":hover": { cursor: "pointer" } }} onClick={handleLoginLink}>Sign In</Link></Typography>
            <Divider><Typography textAlign="center">Or</Typography></Divider>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Button style={btStyle} variant="contained" fullWidth color='primary'>
                <FacebookOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                Signup with Facebook
              </Button>
              <Button style={btStyle} variant="outlined" fullWidth color='primary'>
                <Google sx={{ color: '#4285F4', mr: 1, my: 0.5 }} />
                Signup with Google
              </Button>
            </Box>
          </Paper>
        </Grid>
      )}
      {display === 'Forget' && (
        <Grid container spacing={1} justifyContent="center">
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlined /></Avatar>
              <Typography variant='h4'>Reset Password</Typography>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                type='email'
                fullWidth
                required
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="standard"
                value={email}
              />
            </Box>
            <Button style={btStyle} disabled={!email} variant="contained" onClick={handleCancel} fullWidth color="primary">
              Reset Password
            </Button>
            <Typography> Remember your account? <Link sx={{ ":hover": { cursor: "pointer" } }} onClick={handleLoginLink}>Sign In</Link></Typography>
          </Paper>
        </Grid>
      )}
    </div>
  );
}

export default Login;
