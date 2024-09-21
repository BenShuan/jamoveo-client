import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '../components/Card';
import useAuth from '../utilis/useAuth';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SignInContainer from '../components/SignInContainer';
import { userSchema } from '../utilis/Schemas';
import { useForm } from "react-hook-form"






export default function SignIn(props) {

 
  const [errorLogIn, setErrorLogIn] = useState(null)

  const {
    watch,
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues:{
      instrument:"",
      role:""
    },
    resolver: zodResolver(userSchema),
  });

  const { loginAction } = useAuth()


  const submitForm = (data) => {
  
    loginAction({
      username: data.username,
      password: data.password,
    },setErrorLogIn)

  };


  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >

          <TextField
            {...register("username")}
            label="Username"
            error={!!errors?.username}
            helperText={errors?.username?.message}
            type="username"
            placeholder="JOHNDOE1@!"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            sx={{ ariaLabel: 'username' }}
          />

          <TextField
            {...register("password")}
            error={!!errors?.password}
            helperText={errors?.password?.message}
            type="password"
            placeholder='*********'
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            label="Password"
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign in

          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <span>
              <NavLink
                to="/register/player"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </NavLink>
            </span>
          </Typography>
        </Box>
      </Card>
      <Snackbar open={errorLogIn} autoHideDuration={6000} onClose={() => setErrorLogIn(false)}>
        <Alert
          onClose={() => setErrorLogIn(null)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorLogIn?.message}
        </Alert>
      </Snackbar>
    </SignInContainer>

  );
}