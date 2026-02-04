import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { getUserBookings, deleteBooking } from '../../services/api';
import api from '../../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reportData, setReportData] = useState({
    reason: 'Service Not Completed',
    description: '',
  });
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getUserBookings();
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load bookings');
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await deleteBooking(bookingId);
        setBookings(bookings.filter((b) => b._id !== bookingId));
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  const handleMarkComplete = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/complete`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to mark as completed');
    }
  };

  const handleReportIssue = (booking) => {
    setSelectedBooking(booking);
    setShowReportModal(true);
    setReportSuccess(false);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings/report', {
        bookingId: selectedBooking._id,
        reason: reportData.reason,
        description: reportData.description,
      });
      setReportSuccess(true);
      setTimeout(() => {
        setShowReportModal(false);
        setReportData({ reason: 'Service Not Completed', description: '' });
      }, 2000);
    } catch (err) {
      alert('Failed to submit report');
    }
  };

  const isBookingPast = (booking) => {
    const bookingDateTime = new Date(booking.date);
    const [hours, minutes] = booking.time.split(':');
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes));
    return new Date() > bookingDateTime;
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Approved':
        return 'success';
      case 'Completed':
        return 'info';
      case 'Cancelled':
        return 'secondary';
      case 'Missed':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 fs-5">Loading bookings...</p>
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
    <>
      <Container className="py-5">
        <h1 className="text-center fw-bold mb-5" style={{ fontSize: '2.5rem', color: '#2d3748' }}>
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center">
            <Alert variant="info">
              <h5>You don't have any bookings yet.</h5>
            </Alert>
            <Button 
              variant="primary" 
              href="/services"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                padding: '0.8rem 2rem',
                fontWeight: '600',
                borderRadius: '10px',
              }}
            >
              Browse Services
            </Button>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {bookings.map((booking) => {
              const isPast = isBookingPast(booking);
              const canComplete = isPast && (booking.status === 'Pending' || booking.status === 'Approved');
              const canReport = isPast && booking.status !== 'Completed';

              return (
                <Col key={booking._id}>
                  <Card 
                    className="h-100 shadow-sm"
                    style={{
                      borderRadius: '15px',
                      border: booking.status === 'Missed' ? '2px solid #ff6348' : 'none',
                    }}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title className="fw-bold" style={{ fontSize: '1.3rem' }}>
                          {booking.serviceId?.name || 'Service'}
                        </Card.Title>
                        <Badge bg={getStatusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted fw-semibold">Date & Time</small>
                        <p className="fw-semibold mb-0" style={{ fontSize: '1.05rem' }}>
                          {new Date(booking.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-muted mb-0">{booking.time}</p>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted fw-semibold">Price</small>
                        <p className="fw-bold mb-0" style={{ fontSize: '1.2rem', color: '#667eea' }}>
                          ${booking.serviceId?.price || 0}
                        </p>
                      </div>

                      {booking.notes && (
                        <div className="mb-3">
                          <small className="text-muted fw-semibold">Notes</small>
                          <p className="mb-0 text-secondary">{booking.notes}</p>
                        </div>
                      )}

                      <div className="d-flex flex-column gap-2 mt-3">
                        {/* Cancel Button for Pending bookings */}
                        {booking.status === 'Pending' && !isPast && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleCancel(booking._id)}
                          >
                            Cancel Booking
                          </Button>
                        )}

                        {/* Mark as Complete Button */}
                        {canComplete && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleMarkComplete(booking._id)}
                          >
                            ✓ Mark as Completed
                          </Button>
                        )}

                        {/* Report Issue Button */}
                        {canReport && (
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleReportIssue(booking)}
                          >
                            ⚠️ Report Issue
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>

      {/* Report Issue Modal */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Report Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reportSuccess ? (
            <Alert variant="success">
              ✓ Report submitted successfully! Admin will review your complaint.
            </Alert>
          ) : (
            <Form onSubmit={handleSubmitReport}>
              <p className="mb-3">
                <strong>Service:</strong> {selectedBooking?.serviceId?.name}
                <br />
                <strong>Date:</strong> {new Date(selectedBooking?.date).toLocaleDateString()}
              </p>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Reason</Form.Label>
                <Form.Select
                  value={reportData.reason}
                  onChange={(e) => setReportData({ ...reportData, reason: e.target.value })}
                  required
                >
                  <option value="Service Not Completed">Service Not Completed</option>
                  <option value="Provider Did Not Show">Provider Did Not Show</option>
                  <option value="Poor Service Quality">Poor Service Quality</option>
                  <option value="Wrong Service Provided">Wrong Service Provided</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={reportData.description}
                  onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                  required
                  placeholder="Please describe the issue in detail..."
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => setShowReportModal(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                  }}
                >
                  Submit Report
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyBookings;