import React from 'react'
import { useLoaderData } from 'react-router-dom'
import SignInContainer from '../../components/signInContainer'
import ListItem from '../../components/ListItem'
import { Box, Stack } from '@mui/material'
import { useEffect } from 'react'

const ResultsPage = () => {

  const data = useLoaderData()

  // useEffect(() => {
  //   function reciveConfirm(value) {
  //     console.log(value)
  //   }
  //   socket.on('admin-start-session', onConnect);

  //   return () => {
  //     socket.off('connect', onConnect);

  //   }
  // }, [third])


  return (
    <SignInContainer>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2} overflow={"scroll"} >
          {
            data.map((song, i) => {
              return <ListItem key={song.name + i} song={song} />

            })
          }

        </Stack>
      </Box>
    </SignInContainer >
  )
}

export default ResultsPage



