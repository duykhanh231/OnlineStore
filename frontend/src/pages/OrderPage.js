import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(StoreContext);
  const { userInfo } = state;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingDeliver, setLoadingDeliver] = useState(false);

  useEffect(() => {
    // THE FIX: Don't do anything if we don't have the user info yet
    if (!userInfo) {
      return;
    }

    const fetchOrderAndPaypal = async () => {
      try {
        setLoading(true);
        // Fetch the order details
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrder(data);

        // If the order is not paid, load the PayPal script
        if (!data.isPaid) {
          const { data: clientId } = await axios.get('/api/config/paypal');
          paypalDispatch({
            type: 'resetOptions',
            value: { 'client-id': clientId, currency: 'USD' },
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchOrderAndPaypal();
    // Re-run this effect only when the orderId or userInfo changes
  }, [orderId, userInfo, paypalDispatch]);


  function createOrder(data, actions) { /* ... no changes ... */ }
  function onApprove(data, actions) { /* ... no changes ... */ }
  function onError(err) { /* ... no changes ... */ }
  const deliverHandler = async () => { /* ... no changes ... */ };

  // If the user logs out while on the page, redirect them
  useEffect(() => {
      if(!userInfo) {
          navigate('/login');
      }
  }, [userInfo, navigate]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : order ? ( // Make sure we have an order before rendering
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {new Date(order.deliveredAt).toLocaleString()}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method: </strong>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {new Date(order.paidAt).toLocaleString()}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                        <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                        <Col md={4}>{item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
              <ListGroup.Item><Row><Col>Items</Col><Col>${order.itemsPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Shipping</Col><Col>${order.shippingPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Tax</Col><Col>${order.taxPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Total</Col><Col>${order.totalPrice}</Col></Row></ListGroup.Item>
              
              {!order.isPaid && order.user._id === userInfo._id && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? <Loader /> : (
                    <div><PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons></div>
                  )}
                </ListGroup.Item>
              )}
              
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='w-100' onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  ) : null; // Render nothing if there's no order and no error/loading
};

export default OrderPage;