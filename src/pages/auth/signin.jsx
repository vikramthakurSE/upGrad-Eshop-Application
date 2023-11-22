import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LOCAL, ENDPOINTS } from '../../common/utils';
import { useDispatch } from 'react-redux';
import { setUserRole, setUserToken, setUserId } from '../../common/role-manager';
import axios from 'axios';
import "../../common/style.css"

export const SignIn = () => {

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    let message = null
    if(location.state !== null)
        message = location.state

    const onSubmit = (data) => {
        let signInURL = LOCAL.SERVER_PATH + ENDPOINTS.SIGNIN;
        axios.post(signInURL, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            setError(false)
            dispatch(setUserToken(response.data.token));
            //NOTE: I have updated the backend code to pass the user id and the role as to set it accross the application
            dispatch(setUserRole(response.data.role[0].authority));
            dispatch(setUserId(response.data.userId));
            if(message !== 'undefined' || message !== null){
                navigate(-1);
            }else
                navigate('/');
            
        }).catch(error => {
            console.debug(error)
            setError(true)
            if(error.response.status == 401)
                setErrorMessage("Unauthorized error: Bad credentials.")
            else if(error.response.data.message != null )
                setErrorMessage(error.response.data.message)
            else
                setErrorMessage(error.response.data.error)
        });
    };

    useEffect(() => {
        if(message !== 'undefined' && message !== null){
            setError(true)
            setErrorMessage(message.message)
        }
      }, []);

    return (
        <Container maxWidth="xs" className="center"> 
            { error ? <>
                <Alert severity="warning" style={{justifyContent: 'center'}}>
                    <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
            </> : <></>}
            <div className='signinIcon'>
                <LockOutlinedIcon fontSize="large" />
            </div>
            <Typography variant="h5" component="h1" gutterBottom>
                Sign In
            </Typography>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <TextField margin="normal" required fullWidth id="username"
                    label="Email Address" name="username" autoComplete="email" autoFocus  {...register('username')} />
                <TextField margin="normal" required fullWidth id="password"
                    name="password" label="Password" type="password" autoComplete="current-password" {...register('password')} />
                <Button type="submit" fullWidth variant="contained" color="primary" >
                    Sign In
                </Button>
            </form>
            <Link to="/signup" style={{marginTop: '1em', display: 'flex'}}>
                Don't have a account? Sign up
            </Link>
            <Typography variant="body2" color={'GrayText'} style={{margin: '3em'}}>
                Copyright @ upGrad 2021
            </Typography>
        </Container>
    )
}
