import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const { userInfo } = state;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState('');
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const fetchUserProfile = async () => {
        try {
          const { data } = await axios.get('/api/users/profile', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setName(data.name);
          setEmail(data.email);
        } catch (err) {
            setError(err.response?.data?.message || 'Could not fetch profile');
        }
      };
      
      const fetchUserOrders = async () => {
        try {
            setLoadingOrders(true);
            const { data } = await axios.get('/api/orders/myorders', {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setOrders(data);
            setLoadingOrders(false);
        } catch (err) {
            setErrorOrders(err.response?.data?.message || 'Could not fetch orders');
            setLoadingOrders(false);
        }
      };

      fetchUserProfile();
      fetchUserOrders();
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setMessage('');
    setLoading(true);
    try {
      const { data } = await axios.put('/api/users/profile', { name, email, password }, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      setMessage('Profile Updated Successfully!');
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='success'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'  className='my-3'>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? <i className='fas fa-check' style={{ color: 'green' }}></i> : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                            <td>{order.isDelivered ? <i className='fas fa-check' style={{ color: 'green' }}></i> : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                            <td>
                                <Button as={Link} to={`/order/${order._id}`} className='btn-sm' variant='light'>Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;