import React, { useEffect, useState } from 'react'
import { ProductTemplate } from './product-template'
import { ProductDetails } from './product-details';
import { Container, InputLabel, ToggleButton, ToggleButtonGroup, FormControl, MenuItem, Select, Grid, Paper, Alert, AlertTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../common/role-manager';
import { LOCAL, ENDPOINTS } from '../../common/utils';
import axios from 'axios';
import { Box, styled } from '@mui/system';
import { useLocation } from 'react-router';
import { auto } from '@popperjs/core';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
    margin: '10px', // Adjust margin as needed
});

export const Products = () => {

    const location = useLocation();
    const userRole = useSelector(selectUserRole);
    const [category, setCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDatasetLoading, setIsDatasetLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [productList, setProductList] = useState(null);
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [orderId, setOrderId] = useState(false);
    const [message, setMessage] = useState(null);
    const [showBox, setShowBox] = useState(true);
    const [sortBy, setSortBy] = useState('');
    const [showBoxDisplay, setShowBoxDisplay] = useState('flex');

    useEffect(() => {

        if (location.state != 'undefined' && location.state != null) {
            setPurchaseComplete(location.state.purchaseComplete)
            setMessage(location.state.message)
            setOrderId(location.state.orderId)
        }else{
            setPurchaseComplete(false)
        }

        const hideBoxAfterDelay = setTimeout(() => {
            setShowBox(false);
            setShowBoxDisplay('none')
        }, 5000);

        const fetchData = async () => {
            let createProductURL = LOCAL.SERVER_PATH + ENDPOINTS.PRODUCTS;
            try {
                const response = await axios.get(createProductURL);
                setProducts(response.data);
                setProductList(response.data);
                setIsDatasetLoading(false)
            } catch (error) {
                console.debug(error)
                setIsDatasetLoading(false)
            }
        };

        fetchData(); 

        return () => {
            clearTimeout(hideBoxAfterDelay);
        };
    }, []);

    const handleCategoryChange = (_, newCategory) => {
        if(newCategory === 'All')
            setProducts(productList)
        else
            setProducts(productList.filter(product => product.category == newCategory))
    };

    const handleViewDetails = (productId) => {
        // Set the selected product when "View Details" is clicked
        setSelectedProduct(productId);
    };

    const handleSorting = (event) => {
        const sortBy = event.target.value;
        if(sortBy === 'heighest-lowest')
            setProducts([...products].sort((a, b) =>  b.price - a.price))
        else if(sortBy === 'lowest-heighest')
            setProducts([...products].sort((a, b) => a.price - b.price))
        //sorting by average-ratings is not implemented as we do not have any fields or ratings 
        setSortBy(sortBy);
    }

    return (
        <>
            <Box>
                {
                    purchaseComplete ? <>
                        <Alert severity="success" style={{
                            justifyContent: 'center', margin: auto, marginTop: 20, maxWidth: 750,
                            backgroundColor: '#b4f5a6', transition: 'opacity 1s ease-out', opacity: showBox ? 1 : 0,
                            display: showBoxDisplay
                        }}>
                            <AlertTitle>{message}</AlertTitle>
                        </Alert>
                    </> : <></>
                }
            </Box>
            <Container sx={{ marginTop: 4 }}>
                <StyledToggleButtonGroup
                    value={category}
                    exclusive
                    onChange={handleCategoryChange}
                >
                    <ToggleButton value="All">All</ToggleButton>
                    <ToggleButton value="Apparel">Apparel</ToggleButton>
                    <ToggleButton value="Electronics">Electronics</ToggleButton>
                    <ToggleButton value="Furniture">Furniture</ToggleButton>
                    <ToggleButton value="Personal Care">Personal Care</ToggleButton>
                </StyledToggleButtonGroup>
                <Box>
                    <FormControl style={{ minWidth: 400, float: 'left', marginTop: 25, textAlign: 'justify' }}>
                        <InputLabel id="sortBy">Sort By</InputLabel>
                        <Select
                            labelId="sortBy" id="sortBy"
                            label="Sort By"
                            onChange={handleSorting}
                            value={sortBy}
                        >
                            <MenuItem value="average-ratings">Average Ratings</MenuItem>
                            <MenuItem value="heighest-lowest">Price: Highest to Lowest</MenuItem>
                            <MenuItem value="lowest-heighest">Price: Lowest to Heighest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Container>
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                {
                    isDatasetLoading ? (<p>Loading...</p>) : (
                        <div>
                            {products.length === 0 ? (
                                <Box style={{marginTop: '15em'}}>No products available.</Box>
                            ) : (
                                <Grid container spacing={6}>
                                    {
                                        products.map((product) => (
                                            <Grid item xs={4}>
                                                <Paper>
                                                    <ProductTemplate
                                                        key={product.id}
                                                        onViewDetails={handleViewDetails}
                                                        role={userRole}
                                                        product={product}
                                                        products={products}
                                                        setProducts={setProducts}
                                                    />
                                                </Paper>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            )}
                        </div>
                    )
                }
            </Container>

            {selectedProduct && <ProductDetails productId={selectedProduct} role={userRole} />}
        </>
    )
}
