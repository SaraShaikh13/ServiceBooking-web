import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Table, Form, Badge, ButtonGroup, Button, Card, Spinner } from 'react-bootstrap';
import { getAllBookings, updateBookingStatus } from '../../services/api';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'All');

  useEffect(() => {
    fetchBookings();
    // Set filter from URL if present
    const urlFilter = searchParams.get('filter');
    if (urlFilter) {
      setFilter(urlFilter);
    }
  }, [searchParams]);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      fetchBookings();
    } catch (err) {
      alert('Failed to update status');
    }
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

  const isOverdue = (booking) => {
    if (booking.status === 'Pending' || booking.status === 'Approved') {
      const bookingDateTime = new Date(booking.date);
      const [hours, minutes] = booking.time.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes));
      return new Date() > bookingDateTime;
    }
    return false;
  };

  const filteredBookings = filter === 'All'
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const styles = {
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '2rem',
      color: '#2d3748',
    },
    filterBtn: {
      padding: '0.6rem 1.5rem',
      fontWeight: '600',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
    },
    card: {
      border: 'none',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    },
    overdueRow: {
      backgroundColor: '#fff5f5',
      borderLeft: '4px solid #ff6348',
    },
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
      <h1 style={styles.pageTitle}>📋 Manage Bookings</h1>

      {/* Filter Buttons */}
      <ButtonGroup className="mb-4 d-flex flex-wrap gap-2">
        {['All', 'Pending', 'Approved', 'Completed', 'Cancelled', 'Missed'].map((status) => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              ...styles.filterBtn,
              background: filter === status 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : '#e9ecef',
              color: filter === status ? 'white' : '#495057',
              border: 'none',
            }}
          >
            {status}
            {status !== 'All' && (
              <Badge 
                bg="light" 
                text="dark" 
                className="ms-2"
              >
                {bookings.filter(b => b.status === status).length}
              </Badge>
            )}
          </Button>
        ))}
      </ButtonGroup>

      {/* Info Alert for Missed Bookings */}
      {filter === 'Missed' && filteredBookings.length > 0 && (
        <div className="alert alert-danger mb-4">
          <strong>⚠️ {filteredBookings.length} Missed/Overdue Booking(s)</strong>
          <p className="mb-0 mt-2">These bookings have passed their scheduled time without being completed. Please follow up with customers or service providers.</p>
        </div>
      )}

      {/* Bookings Table */}
      <Card style={styles.card}>
        <Table responsive hover className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  {filter === 'All' 
                    ? 'No bookings found.' 
                    : `No ${filter.toLowerCase()} bookings.`}
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => {
                const overdueStatus = isOverdue(booking);
                return (
                  <tr 
                    key={booking._id}
                    style={
                      booking.status === 'Missed' || overdueStatus 
                        ? styles.overdueRow 
                        : {}
                    }
                  >
                    <td className="fw-semibold">
                      {booking.userId?.name || 'Unknown'}
                      {overdueStatus && booking.status !== 'Missed' && (
                        <Badge bg="danger" className="ms-2">OVERDUE</Badge>
                      )}
                    </td>
                    <td>{booking.serviceId?.name || 'Service'}</td>
                    <td>
                      <div>{new Date(booking.date).toLocaleDateString()}</div>
                      <small className="text-muted">{booking.time}</small>
                    </td>
                    <td className="fw-semibold">${booking.serviceId?.price || 0}</td>
                    <td>
                      <Badge bg={getStatusVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Form.Select
                          size="sm"
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                          style={{ width: '140px' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Missed">Missed</option>
                        </Form.Select>
                        
                        {(booking.status === 'Missed' || overdueStatus) && (
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => {
                              const phone = booking.userId?.phone || '+923001234567';
                              window.open(`tel:${phone}`, '_self');
                            }}
                            title="Call Customer"
                          >
                            📞
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Card>

      {/* Summary Stats */}
      <div className="mt-4">
        <div className="row g-3">
          <div className="col-md-3">
            <div className="p-3 bg-light rounded text-center">
              <div className="fw-bold text-muted small">TOTAL</div>
              <div className="fs-4 fw-bold">{bookings.length}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 rounded text-center" style={{ background: '#fff9e6' }}>
              <div className="fw-bold text-muted small">PENDING</div>
              <div className="fs-4 fw-bold text-warning">
                {bookings.filter(b => b.status === 'Pending').length}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 rounded text-center" style={{ background: '#e6f7ff' }}>
              <div className="fw-bold text-muted small">COMPLETED</div>
              <div className="fs-4 fw-bold text-info">
                {bookings.filter(b => b.status === 'Completed').length}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 rounded text-center" style={{ background: '#fff5f5' }}>
              <div className="fw-bold text-muted small">MISSED</div>
              <div className="fs-4 fw-bold text-danger">
                {bookings.filter(b => b.status === 'Missed').length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ManageBookings;