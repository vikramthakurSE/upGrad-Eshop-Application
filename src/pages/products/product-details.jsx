import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../common/role-manager';

export const ProductDetails = () => {

    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const product = location.state
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);

    const proceedToCheckout = (quantity) => {
        let checkoutDetails = {
            'quantity': quantity,
            'product': product,
        }
        if (userRole === 'DEFAULT')
            navigate('/signin', { state: { 'message': 'Please sign in or sign up before placing your order' } });
        else
            navigate('/checkout', { state: checkoutDetails });
    }

    return (
        <Container sx={{ display: 'flex', maxWidth: '80%', marginTop: '2em' }}>
            <Box style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                <img alt="iPhone 15 Pro" className="image" style={{ width: '80%', height: '80%,', objectFit: 'cover' }}
                    src={product.imageUrl} />
            </Box>
            <Box style={{ flex: 1, textAlign: 'justify', display: 'grid', placeContent: 'center' }}>
                <Typography style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 'bold', fontSize: 30, marginRight: 10 }}>{product.name}</span>
                    <span style={{ backgroundColor: '#1976d2', padding: 10, borderRadius: 20, verticalAlign: 'text-bottom', color: 'white' }}>Available Quantity: {product.availableItems}</span>
                </Typography>
                <Typography style={{ marginBottom: 20 }}>
                    <span>Catagory: <span style={{ fontWeight: 'bold' }}>{product.category}</span></span>
                </Typography>
                <Typography variant='body1' style={{ marginBottom: 20 }}>
                    {product.description}
                </Typography>
                <Typography variant='h4' style={{ marginBottom: 20, color: 'red' }}>
                    ₹ {product.price}
                </Typography>
                <form onSubmit={handleSubmit(proceedToCheckout)}>
                    <TextField margin="normal" required fullWidth id="productQuantity" {...register('productQuantity')}
                        label="Enter Quantity" name="productQuantity" autoFocus sx={{ maxWidth: '50%' }} />
                    <Box style={{ marginTop: 10 }}>
                        <Button type="submit" variant="contained" >Place Order</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}
