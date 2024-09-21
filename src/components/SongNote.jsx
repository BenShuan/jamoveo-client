import { Box, Typography } from '@mui/material'
import React from 'react'

const SongNote = ({note,showChord}) => {

  return (
    <Box sx={{display:'flex',flexDirection:'column',textAlign:'center',justifyContent:'end'}}>
      {note.chords && showChord && <Typography fontSize={'2rem'} color='primary' fontWeight={900} variant='h6'>{note.chords}</Typography>}
      <Typography  fontSize={'2rem'} fontWeight={900}>{note.lyrics}</Typography>
    </Box>
  )
}

export default SongNote