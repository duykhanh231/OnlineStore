import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Because of the proxy, we can just use a relative path
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []); // The empty array [] means this effect runs once when the component mounts

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;