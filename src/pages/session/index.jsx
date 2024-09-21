import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom'
import useAuth from '../../utilis/useAuth';
import { socket } from '../../socket';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function Session() {

  const { user,logOut } = useAuth();
  const navigate = useNavigate();

  const [sessionOn, setSessionOn] = useState(false)

  useEffect(() => {
    console.log('user', user)
    socket.emit('join-room', user)


    function reciveConfirm(value) {
      console.log(value)
    }

    function startSesssion(song) {
      console.log(song)

      navigate(`/live/${song.id}`)
    }

    socket.on('send-conferm', reciveConfirm);
    socket.on('start-session', startSesssion);
    socket.on('end-session', () => navigate("/admin"));


    return () => {
      socket.off('send-conferm', reciveConfirm);
      socket.off('start-sesssion', startSesssion);
      socket.off('end-session', () => navigate("/admin"));

    };
  }, []);

  if (!user) return <Navigate to="/login" />;




  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Welcome ${user.username}`}
          </Typography>
          <Button onClick={logOut} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet />;
  </>
}
