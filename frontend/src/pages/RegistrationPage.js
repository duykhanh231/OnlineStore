import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // For the password mismatch error
  const [message, setMessage] = useState(''); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const { userInfo } = state;

  // If user is already logged in, redirect them
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setMessage(''); // Clear any previous mismatch message
    setLoading(true);
    try {
      // Our backend route for registration is POST /api/users
      const { data } = await axios.post('/api/users', {
        name,
        email,
        password,
      });
      // After successful registration, log the user in immediately
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      navigate(redirect);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
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
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'  className='my-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RegistrationPage;