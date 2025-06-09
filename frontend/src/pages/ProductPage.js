import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const { userInfo } = state;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);

  // State for the new review form
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);
  const [errorReview, setErrorReview] = useState('');
  const [successReview, setSuccessReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
        setLoading(false);
      }
    };
    if (successReview) {
      setSuccessReview(false);
      setRating(0);
      setComment('');
    }
    fetchProduct();
  }, [productId, successReview]);
  
  const addToCartHandler = () => {
    ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: {
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty,
        }
    });
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setLoadingReview(true);
    setErrorReview('');
    try {
      await axios.post(
        `/api/products/${productId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setLoadingReview(false);
      setSuccessReview(true);
      alert('Review submitted successfully!');
    } catch (err) {
      setErrorReview(err.response?.data?.message || 'Failed to submit review');
      setLoadingReview(false);
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        // This conditional wrap ensures nothing renders until `product` exists
        product && (
          <>
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant='flush'>
                  <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                  <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item><Row><Col>Price:</Col><Col><strong>${product.price}</strong></Col></Row></ListGroup.Item>
                    <ListGroup.Item><Row><Col>Status:</Col><Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col></Row></ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button onClick={addToCartHandler} className='w-100' type='button' disabled={product.countInStock === 0}>
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            
            <Row className="review mt-4">
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {loadingReview && <Loader />}
                    {errorReview && <Message variant='danger'>{errorReview}</Message>}
                    {userInfo ? (
                      <Form onSubmit={submitReviewHandler}>
                        <Form.Group controlId='rating' className='my-2'><Form.Label>Rating</Form.Label><Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}><option value=''>Select...</option><option value='1'>1 - Poor</option><option value='2'>2 - Fair</option><option value='3'>3 - Good</option><option value='4'>4 - Very Good</option><option value='5'>5 - Excellent</option></Form.Control></Form.Group>
                        <Form.Group controlId='comment' className='my-2'><Form.Label>Comment</Form.Label><Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control></Form.Group>
                        <Button type='submit' variant='primary' disabled={loadingReview}>Submit</Button>
                      </Form>
                    ) : (
                      <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductPage;