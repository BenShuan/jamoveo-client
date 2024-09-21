import React, { useState } from 'react'
import SignInContainer from '../../components/signInContainer'
import { Box, Fab, Paper, Typography } from '@mui/material'
import { useLoaderData, useNavigate } from 'react-router-dom'
import useAuth from '../../utilis/useAuth'
import SongNote from '../../components/SongNote'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useRef } from 'react'
import { useEffect } from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { socket } from '../../socket'

const LivaPage = () => {
  const { user } = useAuth();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0)

  const scrollElement = useRef();

  const song = useLoaderData();

  const navigate=useNavigate();

  useEffect(() => {
    // while the user is in scrolling mode we add every milseconde 1px to the scrolling element
    // if we riched the bottom the scrolling stop and rest 
    const elm = scrollElement.current;
    console.log(' (elm.scrollHeight - elm.offsetHeight)', Math.floor(elm.scrollHeight - Math.round(elm.scrollTop)))
    console.log('Math.floor(elm.clientHeight) ', Math.floor(elm.clientHeight))
    if (Math.floor(elm.scrollTop) >= Math.floor(elm.scrollHeight - elm.offsetHeight) - 1 || elm.scrollHeight - Math.round(elm.scrollTop) === elm.clientHeight) {
      setIsScrolling(false);
    }
    if (isScrolling) {
      setTimeout(() => {
        console.log(scrollDistance)
        elm.scrollBy(0, 1)
        setScrollDistance(prev => prev + 1)
      }, 100)
    }
  }, [scrollDistance, isScrolling])



  const handelScroll = () => {

    //matcch the currnt scroll state to the user changes and start / stop scrolling
    const elm = scrollElement.current;
    setScrollDistance(Math.floor(elm.scrollTop))
    setIsScrolling(prev => !prev)
  }

  const handelQuit=()=>{
    socket.emit("admin-end-session",()=>console.log('Session ended'))
  }

  return (
    <SignInContainer >
      <Box sx={{ height: '15vh' }}>
        <Typography variant='h2' >{song.name}</Typography>
        <Typography variant='h4' color='textSecondary'>{song.artist}</Typography>
      </Box>
      <Paper ref={scrollElement} elevation={3} sx={{ padding: 1, height: '60vh', overflow: 'scroll', msScrollTranslation: '100', scrollBehavior: 'smooth' }}>
        {
          song.lyrics.map((row, i) => {
            return <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: '1rem' }} key={Math.random()}>
              {row.map((n) => <SongNote key={Math.random()} note={n} showChord={user.instrument !== 'vocals'} />)}
            </Box>
          })
        }
      </Paper>
      <Box sx={{ position: 'fixed', bottom: '5vh', left: '50%', transform: 'translateX(-50%)',display:'flex',gap:'2rem' }}>
        <Fab onClick={handelScroll} size='large'  >
          {
            isScrolling ?
              <PauseIcon fontSize='large' /> :
              <KeyboardDoubleArrowDownIcon fontSize='large' />
          }
        </Fab>
        {user.role==='admin'&& <Fab onClick={handelQuit} size='large'  >
          <StopIcon fontSize='large'/>
        </Fab>}
      </Box>

    </SignInContainer>
  )
}

export default LivaPage