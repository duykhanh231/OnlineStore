import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  // Pre-fill the form with data from localStorage or set to empty strings
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  // If user is not logged in, redirect them to login page
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { address, city, postalCode, country },
    });
    // Move to the next step
    navigate('/payment');
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <CheckoutSteps step1 step2 />
      <div className="w-50">
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address' className='my-3'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city' className='my-3'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode' className='my-3'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country' className='my-3'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ShippingPage;