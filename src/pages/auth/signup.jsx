import React, { useState } from 'react'
import { Container, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LOCAL, ENDPOINTS } from '../../common/utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserRole, setUserToken, setUserId } from '../../common/role-manager';
import "../../common/style.css"

export const SignUp = () => {

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let signUpURL = LOCAL.SERVER_PATH + ENDPOINTS.SIGNUP;
        axios.post(signUpURL, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            setError(false)
            dispatch(setUserRole(response.data.role[0].authority));
            dispatch(setUserToken(response.data.token));
            dispatch(setUserId(response.data.userId));
            navigate('/');
        }).catch(error => {
            setError(true)
            if(error.response.data.status == 400)
                setErrorMessage("Bad Request: Invalid data or parameters.")
            else if(error.response.data.message != null )
                setErrorMessage(error.response.data.message)
            else
                setErrorMessage(error.response.data.error)
        });
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '2em' }}>
            { error ? <>
                <Alert severity="warning" style={{justifyContent: 'center'}}>
                    <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
            </> : <></>}
            <div className='signinIcon'>
                <LockOutlinedIcon fontSize="large" />
            </div>
            <Typography variant="h5" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField margin="normal" required fullWidth id="firstName"
                    label="First Name" {...register('firstName')} />
                <TextField margin="normal" required fullWidth id="lastName"
                    label="Last Name" name="lastName" {...register('lastName')} />
                <TextField margin="normal" required fullWidth id="email"
                    label="Email Address" name="email" autoComplete="email"  {...register('email')} />
                <TextField margin="normal" required fullWidth id="password" autoComplete="new-password"
                    name="password" label="Password" type="password"  {...register('password')} />
                <TextField margin="normal" required fullWidth id="confirm-password" autoComplete="new-password"
                    name="confirm-password" label="Confirm Password" type="password"  {...register('confirm-password')} />
                <TextField margin="normal" required fullWidth id="contactNumber"
                    label="Contact Number" name="contactNumber"  {...register('contactNumber')} />
                <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '1em' }}>
                    Sign Up
                </Button>
            </form>
            <Link to="/signin" style={{ marginTop: '1em', display: 'block', textAlign: "end" }}>
                Already have an account? Sign In
            </Link>
            <Typography variant="body2" color={'GrayText'} style={{ margin: '3em' }}>
                Copyright @ upGrad 2021
            </Typography>
        </Container>
    )
}
