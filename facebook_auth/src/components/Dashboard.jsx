import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
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
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.email}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <label for="relationship-status">Relationship Status: </label>
        <select name='status' id='status-select' value={status} onChange={handleStatus}>
            <option value='single'>Single</option>
            <option value='committed'>Committed</option>
            <option value='searching'>Searching</option>
        </select>
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


