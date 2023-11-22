import React, {useState} from 'react'
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchBar from '../searchbar/searchbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUserRole, setUserRole, setUserId } from '../../common/role-manager';
import "./navbar.css";

export const Navbar = () => {
    const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setUserRole('DEFAULT'));
        dispatch(setUserId(null));
        navigate('/');
    };

    return(
        <AppBar position="static">
            <Toolbar variant="dense">
                <Link to="/">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <ShoppingCart style={{ color: 'white'}}/>
                    </IconButton>
                </Link>
                <Typography variant="h6" color="inherit" component="div">
                    upGrad Eshop
                </Typography>
                <SearchBar/>
                <Link to="/" style={{margin: 10, color: 'white'}}>
                    <Typography variant="body1" color="inherit" component="div">
                        Home
                    </Typography>
                </Link>
                {userRole.toUpperCase() === 'ADMIN' ? <>
                    <Link to={{pathname:"/addProduct", state: null}} style={{margin: 10, color: 'white'}} >
                        <Typography variant="body1" color="inherit" component="div">
                            Add Product
                        </Typography>
                    </Link>
                </>: ``}
                {userRole.toUpperCase() === 'DEFAULT' ? <>
                    <Link to="/signin" >
                        <button type="button" className ="btn btn-danger">Login</button>
                    </Link></> : <>
                        <button type="button" className ="btn btn-danger" onClick={handleLogout}>Log out</button>
                    </>
                }
                
            </Toolbar>
        </AppBar>
    )
}