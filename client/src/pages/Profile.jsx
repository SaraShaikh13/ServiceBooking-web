import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  
  const [nameData, setNameData] = useState({
    name: user?.name || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [nameSuccess, setNameSuccess] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setNameData({ name: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setNameSuccess('');
    setLoading(true);

    try {
      const response = await api.put('/auth/update-profile', { name: nameData.name });
      
      // Update local storage
      const updatedUser = { ...user, name: nameData.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setNameSuccess('Name updated successfully!');
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setNameError(error.response?.data?.message || 'Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await api.put('/auth/update-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      setPasswordSuccess('Password updated successfully! Please login again.');
      setTimeout(() => {
        logout();
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setPasswordError(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    headerSection: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '4rem 0',
      color: 'white',
      marginBottom: '3rem',
    },
    pageTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '1.1rem',
      textAlign: 'center',
      opacity: 0.9,
    },
    card: {
      border: 'none',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      padding: '2rem',
      marginBottom: '2rem',
    },
    cardTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: '#2d3748',
    },
    infoItem: {
      display: 'flex',
      padding: '1rem',
      borderBottom: '1px solid #e2e8f0',
    },
    infoLabel: {
      fontWeight: '600',
      color: '#718096',
      width: '150px',
    },
    infoValue: {
      color: '#2d3748',
      fontWeight: '500',
    },
    badge: {
      display: 'inline-block',
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600',
    },
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.headerSection}>
        <Container>
          <h1 style={styles.pageTitle}>Profile Settings</h1>
          <p style={styles.subtitle}>
            Manage your account information and security
          </p>
        </Container>
      </div>

      <Container className="pb-5">
        <Row>
          <Col lg={8} className="mx-auto">
            {/* Account Information */}
            <Card style={styles.card}>
              <h3 style={styles.cardTitle}>Account Information</h3>
              <div>
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Name:</div>
                  <div style={styles.infoValue}>{user?.name}</div>
                </div>
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Email:</div>
                  <div style={styles.infoValue}>{user?.email}</div>
                </div>
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Role:</div>
                  <div style={styles.infoValue}>
                    <span 
                      style={{
                        ...styles.badge,
                        background: user?.role === 'admin' ? '#667eea' : '#38d39f',
                        color: 'white',
                      }}
                    >
                      {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </span>
                  </div>
                </div>
                <div style={{ ...styles.infoItem, border: 'none' }}>
                  <div style={styles.infoLabel}>Member Since:</div>
                  <div style={styles.infoValue}>
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Update Name */}
            <Card style={styles.card}>
              <h3 style={styles.cardTitle}>Update Name</h3>
              {nameSuccess && <Alert variant="success">{nameSuccess}</Alert>}
              {nameError && <Alert variant="danger">{nameError}</Alert>}
              
              <Form onSubmit={handleNameSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={nameData.name}
                    onChange={handleNameChange}
                    required
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={loading || nameData.name === user?.name}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    padding: '0.7rem 2rem',
                    fontWeight: '600',
                    borderRadius: '10px',
                  }}
                >
                  {loading ? 'Updating...' : 'Update Name'}
                </Button>
              </Form>
            </Card>

            {/* Change Password */}
            <Card style={styles.card}>
              <h3 style={styles.cardTitle}>Change Password</h3>
              {passwordSuccess && <Alert variant="success">{passwordSuccess}</Alert>}
              {passwordError && <Alert variant="danger">{passwordError}</Alert>}
              
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Enter current password"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Enter new password (min 6 characters)"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Confirm new password"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    padding: '0.7rem 2rem',
                    fontWeight: '600',
                    borderRadius: '10px',
                  }}
                >
                  {loading ? 'Updating...' : 'Change Password'}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;