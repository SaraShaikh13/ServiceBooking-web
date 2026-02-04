import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ServiceForm = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'Home Services',
  });

  const categories = [
    'Home Services',
    'Beauty Care',
    'Auto Services',
    'Health',
    'Education',
    'Delivery',
    'Tech Services',
    'Events'
  ];

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        price: service.price || '',
        duration: service.duration || '',
        category: service.category || 'Home Services',
      });
    }
  }, [service]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Service Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Electrician, Plumber, etc."
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Category</Form.Label>
        <Form.Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe the service..."
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Price ($)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              placeholder="30"
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-3">
        <Button variant="secondary" className="flex-fill" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" className="flex-fill fw-semibold">
          {service ? 'Update Service' : 'Create Service'}
        </Button>
      </div>
    </Form>
  );
};

export default ServiceForm;