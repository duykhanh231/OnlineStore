import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const {
    cart: { shippingAddress, paymentMethod: savedPaymentMethod },
  } = state;

  // If user hasn't entered shipping address, redirect them
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // Pre-fill state with saved method, or default to 'PayPal'
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
    navigate('/placeorder');
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <CheckoutSteps step1 step2 step3 />
      <div className="w-50">
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                className='my-2'
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                className='my-2'
                type='radio'
                label='VNPay'
                id='VNPay'
                name='paymentMethod'
                value='VNPay'
                checked={paymentMethod === 'VNPay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                className='my-2'
                type='radio'
                label='Momo'
                id='Momo'
                name='paymentMethod'
                value='Momo'
                checked={paymentMethod === 'Momo'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentPage;