import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { createBooking } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const service = location.state?.service;

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!service) {
    navigate('/services');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const bookingData = {
        serviceId: service._id,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
      };

      await createBooking(bookingData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Card className="text-center p-5 shadow">
          <div className="text-success" style={{ fontSize: '4rem' }}>✓</div>
          <h2 className="fw-bold mb-2">Booking Successful!</h2>
          <p className="text-muted">Redirecting to your bookings...</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card.Body className="p-4">
          <h2 className="fw-bold mb-4">Book {service.name}</h2>

          <Card className="bg-light mb-4">
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <small className="text-muted">Service</small>
                  <p className="fw-semibold mb-0">{service.name}</p>
                </Col>
                <Col md={6} className="mb-3">
                  <small className="text-muted">Price</small>
                  <p className="fw-semibold text-primary mb-0">${service.price}</p>
                </Col>
                <Col md={6}>
                  <small className="text-muted">Duration</small>
                  <p className="fw-semibold mb-0">{service.duration} mins</p>
                </Col>
                <Col md={6}>
                  <small className="text-muted">Customer</small>
                  <p className="fw-semibold mb-0">{user?.name}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Select Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Select Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Additional Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special requirements or notes..."
              />
            </Form.Group>

            <div className="d-flex gap-3">
              <Button 
                variant="secondary" 
                className="flex-fill"
                onClick={() => navigate('/services')}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                className="flex-fill fw-semibold"
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingForm;