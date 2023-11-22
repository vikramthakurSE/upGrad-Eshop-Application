import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router';

export const ConfirmDetails = (data) => {
    
    const { quantity, product, address } = data.state

    return (
        <Container sx={{ display: 'flex', marginTop: '2em', backgroundColor: 'white' }}>
            <Box style={{ flex: 1.8, overflow: 'hidden', position: 'relative', textAlign: 'justify', marginRight: 20, marginTop: 30 }}>
                <Typography style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 'bold', fontSize: 30, marginRight: 10 }}>{product.name}</span>
                </Typography>
                <Typography style={{ marginBottom: 20 }}>
                    <span>Quantity: <span style={{ fontWeight: 'bold' }}>{quantity.productQuantity}</span></span>
                </Typography>
                <Typography style={{ marginBottom: 20 }}>
                    <span>Catagory: <span style={{ fontWeight: 'bold' }}>{product.category}</span></span>
                </Typography>
                <Typography variant='body1' style={{ marginBottom: 20 }}>
                    {product.description}
                </Typography>
                <Typography variant='h5' style={{ marginBottom: 20, color: 'red' }}>
                    Total Price: ₹ {product.price * quantity.productQuantity}
                </Typography>
            </Box>
            <Box style={{ flex: 1, textAlign: 'justify', display: 'grid', borderLeft: '3px solid whitesmoke' }}>
                <Typography style={{ marginTop: 30, marginLeft: 10 }}>
                    <span style={{ fontWeight: 'bold', fontSize: 30, marginLeft: 20 }}>Address Details:</span>
                </Typography>
                <Typography style={{marginLeft: 20 }}>
                    {address.name}<br />
                    {address.street}<br />
                    {address.zipcode}<br />
                    {address.state}
                </Typography>
            </Box>
        </Container>
    )
}
