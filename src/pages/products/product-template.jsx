import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS, LOCAL } from "../../common/utils";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../common/role-manager";

export const ProductTemplate = (props) => {
    
    const navigate = useNavigate();
    const { role } = props;
    const { product } = props
    const { products } = props
    const { setProducts } = props
    const [open, setOpen] = useState(false);
    const userToken = useSelector(selectUserToken);

    const handleNavigation = (productDetails) => {
        navigate('/productDetails', { state: productDetails });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (id) => {
        let createProductURL = LOCAL.SERVER_PATH + ENDPOINTS.PRODUCTS+'/'+id;
        axios.delete(createProductURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }).then((response) => {
                console.debug(response)
            }).catch((error) => {
                console.debug(error)
            });
        setProducts(products.filter(product => product.id != id))
        setOpen(false);
    };

    return (
        <Card sx={{ maxWidth: 350, minHeight: 450, marginTop: 8 }}>
            <CardMedia
                sx={{ height: 200 }}
                image={product.imageUrl}
                title="green iguana"
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>
                            {product.name}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>
                            ₹ {product.price}
                        </Typography>
                    </div>
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ textAlign: 'justify', marginTop: 20, minHeight: 115 }}>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button variant="contained" size="small" onClick={() => handleNavigation(product)}>BUY</Button>
                </div>
                {
                    role.toUpperCase() === 'ADMIN' ?
                        <div>
                            <IconButton onClick={() => navigate(`/modifyProduct`, { state: product })} aria-label="delete">
                                <ModeEditOutlineIcon size="small" style={{ textAlign: 'left', color: '#424242' }} />
                            </IconButton>
                            <IconButton onClick={handleOpen} aria-label="delete">
                                <DeleteIcon size="small" style={{ textAlign: 'left', color: '#424242' }} />
                            </IconButton>
                        </div> : <></>
                }
            </CardActions>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm deletion of product!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSubmit(product.id)} color="primary" variant="contained">
                        OK
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}
