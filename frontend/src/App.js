import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import RegistrationPage from './pages/RegistrationPage';
import AdminRoute from './components/AdminRoute';
import OrderListPage from './pages/admin/OrderListPage';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegistrationPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path='' element={<AdminRoute />}>
              <Route path='/admin/orderlist' element={<OrderListPage />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;