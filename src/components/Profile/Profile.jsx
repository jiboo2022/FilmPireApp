import React, {useEffect} from 'react';
import { Typography , Box, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';


const Profile = () => {
  console.log('profilePage');
  const favouriteMovies = [];

  const logout = ()=> {
    localStorage.clear();

    window.location.href = '/';

    };




   return  (
     <>
      <Box>
        <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom >My Profile</Typography>
        <Button color='inherit' onClick={logout} style={{ float: 'right'}} >
          Logout &nbsp; <ExitToApp />
        </Button>

        </Box>

        {!favouriteMovies.length ?
         <Typography variant='h5'>Add Favorites or watchlist some movies to see here</Typography>:
           <Box>FAVORITE MOVIES</Box>
        }
      </Box>
     </>
        )
  
}

export default Profile