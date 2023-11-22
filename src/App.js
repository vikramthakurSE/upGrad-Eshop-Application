import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { SignIn } from './pages/auth/signin';
import { SignUp } from './pages/auth/signup';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/products/product-details';
import { Checkout } from './pages/order/checkout';
import { AddProduct } from './pages/products/add-product';
import { Provider } from 'react-redux';
import { Roles } from './common/roles';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <div className='App'>
            <Provider store={Roles}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Products />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/addProduct" element={<AddProduct />}></Route>
                    <Route path="/modifyProduct" element={<AddProduct />}></Route>
                    <Route path="/productDetails" element={<ProductDetails />}></Route>
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
            </Provider>
        </div>
    );

}

export default App;
