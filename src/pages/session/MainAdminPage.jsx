import React, { useState } from 'react'
import SignInContainer from '../../components/signInContainer';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainAdminPage = () => {
  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate("/admin/results?query="+search)
  }

  console.log('admin ' )

  return (
    <SignInContainer flexDirection={"column"} alignItems="center" gap={4}>
      <Typography textAlign={"center"} variant='h3'>
        Search any song
      </Typography>
      <TextField
        value={search}
        onChange={(e)=>setSearch(e.currentTarget.value)}
        label="Look for a song" variant="outlined" />
      <Button variant='contained' onClick={handleSubmit}> Search</Button>
    </SignInContainer>
  )
}

export default MainAdminPage;
