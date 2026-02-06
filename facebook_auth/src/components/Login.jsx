import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { signInWithPopup } from 'firebase/auth';
import {auth, provider} from '../config/Firebase';
import { AppContext } from '../App';


function Login() {
    const { setUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleFacebookLogin =async ()=>{
        try{
            const result = await signInWithPopup(auth, provider)
                setUser(result.user);
                // console.log(result)
                navigate('/dashboard');
        }catch(error){
            console.log(error);
        }
    }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Welcome Back!
      </Typography>
      <Typography variant="h5" component="div">
        Login
      </Typography>
        <CardActions sx={{'justifyContent': 'center'}}>
        <Button onClick={handleFacebookLogin} size="small">Login with Facebook</Button>
        </CardActions>
    </CardContent>

  </React.Fragment></Card>
    </Box>
  )
}

export default Login
