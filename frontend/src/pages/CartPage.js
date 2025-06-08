import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import Message from '../components/Message';

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;

  const removeFromCartHandler = (id) => {
    ctxDispatch({
        type: 'CART_REMOVE_ITEM',
        payload: { _id: id }
    });
  };

  const checkoutHandler = () => {
    // Navigate to login page, but redirect to shipping page after login
    navigate('/login?redirect=/shipping');
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    {/* We will add quantity update logic later */}
                    {item.qty}
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>
                        Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        items
                    </h2>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button
                        type='button'
                        className='w-100'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Proceed To Checkout
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;