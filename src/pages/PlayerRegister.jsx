import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Card from '../components/Card';
import useAuth from '../utilis/useAuth';
import { Alert, Autocomplete, CircularProgress, MenuItem, Select, Snackbar } from '@mui/material';
import SignInContainer from '../components/SignInContainer';
import { useNavigation, useParams, useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../utilis/Schemas';

const instruments = ["Drums", "Guitar", "Bass", "Saxophone", "Keyboard", "Vocal"]

export default function PlayerRegister(props) {

  // using url param to determin which register nides to preforme
  const {role} = useParams()


// using react hook form for easy state management
  const {
    register,
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
       role:role==='admin' || role==='palyer'?role : "player"
    },
    resolver: zodResolver(userSchema),
  });

  console.log('errors', errors)
  const [errorRegister, setErrorRegister] = useState(null)

  const { registerAction } = useAuth();

  const submitForm = (data) => {

    registerAction(data, setErrorRegister)
  };


  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >

          <TextField
            {...register("username")}
            error={!!errors?.username}
            helperText={errors?.username?.message}
            type="username"
            placeholder="JOHNDOE1@!"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            label="Username"
            variant="outlined"
            sx={{ ariaLabel: 'username' }}
          />

          <TextField
            {...register("password")}
            error={!!errors?.password}
            helperText={errors?.password?.message}
            placeholder="••••••"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            label="Password"
          />

          <Controller
            control={control}
            name={'instrument'}
            render={({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => (
              <Autocomplete
                options={instruments}
                getOptionLabel={option => option}
                ref={ref}
                value={value || ""}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Instruments"
                    error={invalid}
                    helperText={error?.message}
                  />
                )}
                onChange={(event, data) => {
                  onChange(data)
                  return data;
                }}
              />
            )}


          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
          >
            { isSubmitting&& <CircularProgress size={"1.5rem"} sx={{position:'absolute'}} />}
            Sign in
          </Button>
        </Box>
      </Card>
      <Snackbar open={errorRegister} autoHideDuration={6000} onClose={() => errorRegister(false)}>
        <Alert
          onClose={() => errorRegister(null)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorRegister?.message}
        </Alert>
      </Snackbar>
    </SignInContainer>

  );
}