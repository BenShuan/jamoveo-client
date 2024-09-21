import { Box } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../utilis/useAuth'

function AdminLayout() {

  const {user} = useAuth()

  if (user.role !== 'admin') {
    return <Navigate to="/" />
  }

  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export default AdminLayout