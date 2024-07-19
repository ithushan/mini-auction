import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { RegisterApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
// alert
import swal from 'sweetalert';

const defaultTheme = createTheme();

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);

    const nameValue = data.get('name');
    const emailValue = data.get('email');
    const passwordValue = data.get('password');

    let newErrors = {
      nameError: !nameValue,
      emailError: !validateEmail(emailValue),
      passwordError: passwordValue.length < 6
    };

    setErrors(newErrors);

    if (!newErrors.nameError && !newErrors.emailError && !newErrors.passwordError) {
      console.log({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      });

      // api call
      RegisterApi(inputs).then((res) => {
        console.log(res);
        storeUserData(res.data.idToken);
        swal("Success", "You have successfully registered!", "success");
      }).catch((err) => {
        console.log(err);
        if(err.response.data.error.message == 'EMAIL_EXISTS'){
          swal("EMAIL EXISTS", "This email is already registered !", "error");
        }
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  if(isAuthenticated()){
    // redirect the user
    return <Navigate to={'/dashboard'}/>
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  value={inputs.name}
                  onChange={handleInputChange}
                  error={errors.nameError}
                  helperText={errors.nameError ? 'Full Name is required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={inputs.email}
                  onChange={handleInputChange}
                  error={errors.emailError}
                  helperText={errors.emailError ? 'Enter a valid email' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={inputs.password}
                  onChange={handleInputChange}
                  error={errors.passwordError}
                  helperText={errors.passwordError ? 'Password should be at least 6 characters' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/account" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
