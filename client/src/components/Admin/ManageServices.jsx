import { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Spinner } from 'react-bootstrap';
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from '../../services/api';
import ServiceForm from './ServiceForm';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch services', err);
      setLoading(false);
    }
  };

  const handleCreate = async (serviceData) => {
    try {
      await createService(serviceData);
      setShowForm(false);
      fetchServices();
    } catch (err) {
      alert('Failed to create service');
    }
  };

  const handleUpdate = async (serviceData) => {
    try {
      await updateService(editingService._id, serviceData);
      setShowForm(false);
      setEditingService(null);
      fetchServices();
    } catch (err) {
      alert('Failed to update service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (err) {
        alert('Failed to delete service');
      }
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingService(null);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Manage Services</h1>
        {!showForm && (
          <Button variant="primary" onClick={() => setShowForm(true)}>
            + Add New Service
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="shadow-sm mb-4">
          <Card.Body className="p-4">
            <h3 className="fw-bold mb-4">
              {editingService ? 'Edit Service' : 'Create New Service'}
            </h3>
            <ServiceForm
              service={editingService}
              onSubmit={editingService ? handleUpdate : handleCreate}
              onCancel={handleCancel}
            />
          </Card.Body>
        </Card>
      )}

      <Card className="shadow-sm">
        <Table responsive hover className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No services available. Create one to get started!
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id}>
                  <td className="fw-semibold">{service.name}</td>
                  <td>{service.description.substring(0, 50)}...</td>
                  <td className="fw-semibold">${service.price}</td>
                  <td>{service.duration} mins</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(service)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default ManageServices;