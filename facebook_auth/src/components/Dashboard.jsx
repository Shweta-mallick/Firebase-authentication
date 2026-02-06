import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AppContext } from '../App';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Firebase';

function Dashboard() {

    const {user, setUser} = useContext(AppContext);

    const [status, setStatus] = useState('single');

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    }, [user,navigate]);

    const handleStatus = (event)=>{
      setStatus(event.target.value);
    }

    const handleLogout = async()=>{
        try{
            await signOut(auth)
            setUser(null);
            navigate('/');

        }catch(error){
            console.log(error);
        }
    }

    if(!user) return null;

  return (
    
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={user.photoURL}
          alt={user.email}
          sx={{
            'width': 70,
            'height': 70,
            'objectFit':'cover',
            'borderRadius': '50%',
            'padding': '10px'
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.displayName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <InputLabel id="relationship-status">Status: </InputLabel >
        <Select name='status' id='status-select' value={status} onChange={handleStatus} label="relationship-status">
            <MenuItem value='single'>Single</MenuItem>
            <MenuItem value='committed'>Committed</MenuItem>
            <MenuItem value='searching'>Searching</MenuItem>
        </Select>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Button onClick={handleLogout} size="small" color="primary">
          Logout
        </Button>
      </CardActions>
    </Card>
  )
}

export default Dashboard


        // <Select
        //   labelId="demo-simple-select-label"
        //   id="demo-simple-select"
        //   value={age}
        //   label="Age"
        //   onChange={handleChange}
        // >
        //   <MenuItem value={10}>Ten</MenuItem>
        //   <MenuItem value={20}>Twenty</MenuItem>
        //   <MenuItem value={30}>Thirty</MenuItem>
        // </Select>