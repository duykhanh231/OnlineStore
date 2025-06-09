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
    // If we don't have user info, we can't fetch anything.
    if (!userInfo) {
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Order Not Found');
        setLoading(false);
      }
    };

    // We only fetch the order if it's not already loaded or if it's a different order.
    if (!order || order._id !== orderId) {
      fetchOrder();
    }
  }, [orderId, userInfo, order]);

  // This separate effect handles loading the PayPal script
  useEffect(() => {
    if (order && !order.isPaid) {
      if (!window.paypal) {
        const loadPaypalScript = async () => {
          const { data: clientId } = await axios.get('/api/config/paypal', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          paypalDispatch({
            type: 'resetOptions',
            value: { 'client-id': clientId, currency: 'USD' },
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        };
        loadPaypalScript();
      }
    }
  }, [order, paypalDispatch, userInfo]);


  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }],
    }).then(orderID => orderID);
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      try {
        setLoadingPay(true);
        await axios.put(`/api/orders/${orderId}/pay`, details, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        const { data: updatedOrder } = await axios.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrder(updatedOrder);
        setLoadingPay(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Payment failed');
        setLoadingPay(false);
      }
    });
  }

  function onError(err) { setError(err.toString()); }

  const deliverHandler = async () => {
    try {
      setLoadingDeliver(true);
      await axios.put(`/api/orders/${orderId}/deliver`, {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const { data: updatedOrder } = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setOrder(updatedOrder);
      setLoadingDeliver(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order');
      setLoadingDeliver(false);
    }
  };

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city},{' '}{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
              {order.isDelivered ? <Message variant='success'>Delivered on {new Date(order.deliveredAt).toLocaleString()}</Message> : <Message variant='danger'>Not Delivered</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method: </strong>{order.paymentMethod}</p>
              {order.isPaid ? <Message variant='success'>Paid on {new Date(order.paidAt).toLocaleString()}</Message> : <Message variant='danger'>Not Paid</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                    <Row>
                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                        <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                        <Col md={4}>{item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
              ))}
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
                  {isPending ? <Loader /> : (<div><PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons></div>)}
                </ListGroup.Item>
              )}
              
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='w-100' onClick={deliverHandler}>Mark As Delivered</Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default OrderPage;