import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getAllServices } from '../../services/api';
import ServiceCard from './ServiceCard';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load services');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 fs-5">Loading services...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>{error}</h4>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center fw-bold mb-5">Our Services</h1>

      {services.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h5>No services available at the moment.</h5>
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {services.map((service) => (
            <Col key={service._id}>
              <ServiceCard service={service} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ServiceList;