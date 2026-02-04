import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { getAllServices } from '../../services/api';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    missedBookings: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const servicesRes = await getAllServices();
      const statsRes = await api.get('/bookings/stats');
      const usersRes = await api.get('/users');

      setStats({
        totalServices: servicesRes.data.length,
        totalBookings: statsRes.data.totalBookings,
        pendingBookings: statsRes.data.pendingBookings,
        completedBookings: statsRes.data.completedBookings,
        missedBookings: statsRes.data.missedBookings,
        totalUsers: usersRes.data.length,
      });
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch stats', err);
      setLoading(false);
    }
  };

  const styles = {
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '2rem',
      color: '#2d3748',
    },
    statCard: {
      border: 'none',
      borderRadius: '15px',
      padding: '1.5rem',
      height: '100%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    statIcon: {
      fontSize: '3rem',
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginTop: '0.5rem',
    },
    statLabel: {
      fontSize: '0.9rem',
      marginTop: '0.3rem',
      opacity: 0.9,
    },
    quickActionsCard: {
      border: 'none',
      borderRadius: '15px',
      padding: '2rem',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: '#2d3748',
    },
    actionCard: {
      border: '2px solid',
      borderRadius: '15px',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'block',
    },
    actionIcon: {
      fontSize: '3rem',
      marginRight: '1rem',
    },
    actionTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '0.3rem',
    },
    actionDesc: {
      fontSize: '0.9rem',
      margin: 0,
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
    <>
      <style>{`
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
        
        .action-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
      `}</style>

      <Container className="py-5">
        <h1 style={styles.pageTitle}>📊 Admin Dashboard</h1>

        {/* Stats Cards - All Solid Colors */}
        <Row className="g-4 mb-5">
          <Col md={6} lg={4}>
            <Card 
              className="stat-card" 
              style={{
                ...styles.statCard,
                background: '#667eea',
                color: 'white',
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div style={styles.statLabel}>Total Services</div>
                  <div style={styles.statValue}>{stats.totalServices}</div>
                </div>
                <div style={styles.statIcon}>📋</div>
              </div>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card 
              className="stat-card" 
              style={{
                ...styles.statCard,
                background: '#38d39f',
                color: 'white',
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div style={styles.statLabel}>Total Bookings</div>
                  <div style={styles.statValue}>{stats.totalBookings}</div>
                </div>
                <div style={styles.statIcon}>📅</div>
              </div>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card 
              className="stat-card" 
              style={{
                ...styles.statCard,
                background: '#a29bfe',
                color: 'white',
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div style={styles.statLabel}>Total Users</div>
                  <div style={styles.statValue}>{stats.totalUsers}</div>
                </div>
                <div style={styles.statIcon}>👥</div>
              </div>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Link to="/admin/bookings?filter=Pending" style={{ textDecoration: 'none' }}>
              <Card 
                className="stat-card" 
                style={{
                  ...styles.statCard,
                  background: '#ffa502',
                  color: 'white',
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={styles.statLabel}>Pending</div>
                    <div style={styles.statValue}>{stats.pendingBookings}</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.9 }}>
                      ⚠️ Click to review
                    </div>
                  </div>
                  <div style={styles.statIcon}>⏳</div>
                </div>
              </Card>
            </Link>
          </Col>

          <Col md={6} lg={4}>
            <Card 
              className="stat-card" 
              style={{
                ...styles.statCard,
                background: '#4facfe',
                color: 'white',
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div style={styles.statLabel}>Completed</div>
                  <div style={styles.statValue}>{stats.completedBookings}</div>
                </div>
                <div style={styles.statIcon}>✅</div>
              </div>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Link to="/admin/bookings?filter=Missed" style={{ textDecoration: 'none' }}>
              <Card 
                className="stat-card" 
                style={{
                  ...styles.statCard,
                  background: '#ff6348',
                  color: 'white',
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={styles.statLabel}>Missed / Overdue</div>
                    <div style={styles.statValue}>{stats.missedBookings}</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.9 }}>
                      🔴 Click to review
                    </div>
                  </div>
                  <div style={styles.statIcon}>⚠️</div>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Link to="/admin/services" style={{ textDecoration: 'none' }}>
                <div 
                  className="action-card"
                  style={{
                    ...styles.actionCard,
                    borderColor: '#667eea',
                    background: '#f7f5ff',
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={styles.actionIcon}>🛠️</div>
                    <div>
                      <h5 style={{ ...styles.actionTitle, color: '#667eea' }}>
                        Manage Services
                      </h5>
                      <p style={{ ...styles.actionDesc, color: '#718096' }}>
                        Add, edit, or delete services
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>

            <Col md={6} lg={4}>
              <Link to="/admin/bookings" style={{ textDecoration: 'none' }}>
                <div 
                  className="action-card"
                  style={{
                    ...styles.actionCard,
                    borderColor: '#38d39f',
                    background: '#f0fdf4',
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={styles.actionIcon}>📋</div>
                    <div>
                      <h5 style={{ ...styles.actionTitle, color: '#38d39f' }}>
                        Manage Bookings
                      </h5>
                      <p style={{ ...styles.actionDesc, color: '#718096' }}>
                        View and update booking status
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>

            <Col md={6} lg={4}>
              <Link to="/admin/users" style={{ textDecoration: 'none' }}>
                <div 
                  className="action-card"
                  style={{
                    ...styles.actionCard,
                    borderColor: '#a29bfe',
                    background: '#f5f3ff',
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={styles.actionIcon}>👥</div>
                    <div>
                      <h5 style={{ ...styles.actionTitle, color: '#a29bfe' }}>
                        Manage Users
                      </h5>
                      <p style={{ ...styles.actionDesc, color: '#718096' }}>
                        Add or remove user accounts
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;