import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  
  // Get the redirect path from the URL, e.g. ?redirect=/shipping
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      navigate(redirect);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  // If user is already logged in, redirect them
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Sign In
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginPage;