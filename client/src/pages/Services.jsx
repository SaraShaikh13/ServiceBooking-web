import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { getAllServices } from '../services/api';
import ServiceCard from '../components/User/ServiceCard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: 'Home Services', icon: '🏠', color: '#667eea' },
    { name: 'Beauty Care', icon: '💇‍♀️', color: '#f093fb' },
    { name: 'Auto Services', icon: '🚗', color: '#4facfe' },
    { name: 'Health', icon: '🏥', color: '#43e97b' },
    { name: 'Education', icon: '📚', color: '#fa709a' },
    { name: 'Delivery', icon: '📦', color: '#feca57' },
    { name: 'Tech Services', icon: '🛠️', color: '#6c5ce7' },
    { name: 'Events', icon: '🎉', color: '#fd79a8' }
  ];

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

  const filteredServices = selectedCategory
    ? services.filter((s) => s.category === selectedCategory)
    : services;

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
      marginBottom: '1rem',
      textAlign: 'center',
    },
    categoryCard: {
      border: 'none',
      borderRadius: '15px',
      padding: '2rem 1rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      height: '100%',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    categoryIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    categoryName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#2d3748',
      margin: 0,
    },
    backButton: {
      background: 'white',
      border: '2px solid #667eea',
      color: '#667eea',
      padding: '0.8rem 2rem',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '2rem',
    },
    categoryTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
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
    <div>
      <style>{`
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
        }
        
        .back-btn:hover {
          background: #667eea !important;
          color: white !important;
        }
      `}</style>

      {/* Header */}
      <div style={styles.headerSection}>
        <Container>
          <h1 style={styles.pageTitle}>Our Services</h1>
          <p className="text-center fs-5" style={{ opacity: 0.9 }}>
            Choose a category to explore our professional services
          </p>
        </Container>
      </div>

      <Container className="pb-5">
        {!selectedCategory ? (
          /* Category Selection View */
          <>
            <Row className="g-4">
              {categories.map((category) => (
                <Col key={category.name} xs={6} md={4} lg={3}>
                  <Card
                    className="category-card"
                    style={{
                      ...styles.categoryCard,
                      background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`,
                    }}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <div style={styles.categoryIcon}>{category.icon}</div>
                    <h5 style={styles.categoryName}>{category.name}</h5>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          /* Services List View */
          <>
            <button
              className="back-btn"
              style={styles.backButton}
              onClick={() => setSelectedCategory(null)}
            >
              ← Back to Categories
            </button>

            <h2 style={styles.categoryTitle}>
              <span>{categories.find((c) => c.name === selectedCategory)?.icon}</span>
              {selectedCategory}
            </h2>

            {filteredServices.length === 0 ? (
              <Alert variant="info" className="text-center">
                <h5>No services available in this category yet.</h5>
                <p className="mb-0">Check back soon for new services!</p>
              </Alert>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {filteredServices.map((service) => (
                  <Col key={service._id}>
                    <ServiceCard service={service} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Services;