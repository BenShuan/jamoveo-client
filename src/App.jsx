import ThemeContext from "./context/ThemeContext"
import {
  Outlet,
  RouterProvider
} from "react-router-dom";
import { Box } from "@mui/material";
import router from "./pages/Routs";
import { socket } from "./socket";
import { useEffect } from "react";



function App() {
  
  useEffect(() => {
    socket.connect();
  
    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <ThemeContext>
      <Box sx={{ height: '100dvh', width: '100%' }}>
        <RouterProvider router={router} >

            <Outlet />

        </RouterProvider>

      </Box>
    </ThemeContext>
  )
}

export default App
