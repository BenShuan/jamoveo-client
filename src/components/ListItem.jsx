import { Box, Button, IconButton, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

const ListItemStyle = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  width: '100%',
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  padding: '2rem 1rem'
}));

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

export const ListItem = ({ song }) => {

  const navigate=useNavigate();
  
  const handelChoise =()=>{
    socket.emit("admin-start-session",song)
    navigate("/live/"+song?.id)
  }

  return (


    <ListItemStyle>
      <img src={song?.image} style={{
        width: "7rem", aspectRatio: '1/1', borderRadius: '16px', border: '1px solid black', boxShadow: '1px 2px 5 px  #aaa'
      }} />
      <Box sx={{ alignSelf: 'stretch', flexGrow: 1 }}>
        <Typography textAlign={"left"} variant='h6' >{`Name: ${song?.name}`} </Typography>
        <Typography variant='caption' textAlign={"left"} >{`Artist: ${song?.name}`} </Typography>
      </Box>
      <IconButton aria-label="select" onClick={handelChoise}>
      <AudiotrackIcon fontSize='24'/> 
      </IconButton>

    </ListItemStyle>
  )
}


export default ListItem;