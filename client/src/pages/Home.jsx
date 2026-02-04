import { useContext, useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [counts, setCounts] = useState({
    providers: 0,
    customers: 0,
    categories: 0,
    rating: 0,
  });
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = {
      providers: 500,
      customers: 10000,
      categories: 50,
      rating: 4.8,
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        providers: Math.floor(targets.providers * progress),
        customers: Math.floor(targets.customers * progress),
        categories: Math.floor(targets.categories * progress),
        rating: (targets.rating * progress).toFixed(1),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);
  };

  const styles = {
    heroSection: {
      backgroundImage: 'url("https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1920&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '500px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.35)',
    },
    heroContent: {
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
      color: 'white',
    },
    heroTitle: {
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
      fontWeight: '800',
      marginBottom: '1rem',
      textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
      animation: 'fadeInUp 1s ease',
    },
    heroSubtitle: {
      fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
      marginBottom: '1.5rem',
      textShadow: '1px 1px 6px rgba(0,0,0,0.7)',
      animation: 'fadeInUp 1.2s ease',
    },
    heroBtn: {
      padding: '0.8rem 2.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      borderRadius: '50px',
      background: 'white',
      color: '#667eea',
      border: 'none',
      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease',
    },
    featuresSection: {
      padding: '5rem 0',
      background: '#f8f9fa',
    },
    sectionTitle: {
      fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
      fontWeight: '700',
      marginBottom: '3.5rem',
      color: '#2d3748',
      textAlign: 'center',
    },
    featureCard: {
      border: 'none',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
      height: '100%',
      cursor: 'pointer',
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      transition: 'all 0.3s ease',
    },
    featureTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '0.8rem',
    },
    featureText: {
      color: '#718096',
      lineHeight: '1.6',
      fontSize: '0.95rem',
    },
    aboutSection: {
      backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '5rem 0',
      position: 'relative',
    },
    aboutOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
    },
    aboutContent: {
      position: 'relative',
      zIndex: 1,
      color: 'white',
    },
    statsSection: {
      padding: '3rem 0',
      background: 'white',
    },
    statCard: {
      textAlign: 'center',
      padding: '1.5rem',
    },
    statNumber: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: '800',
      color: '#667eea',
      marginBottom: '0.5rem',
    },
    statLabel: {
      fontSize: '1rem',
      color: '#718096',
    },
  };

  return (
    <div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-btn:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 12px 35px rgba(0,0,0,0.4) !important;
          background: #f8f9fa !important;
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        .feature-card:hover .feature-icon {
          transform: scale(1.15) rotate(5deg);
        }

        @media (max-width: 768px) {
          .heroSection,
          .aboutSection {
            background-attachment: scroll !important;
          }
        }
      `}</style>

      {/* Hero Section - Parallax Effect */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <Container>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Transform Your Service Experience
            </h1>
            <p style={styles.heroSubtitle}>
              Book professional services instantly with just a few clicks
            </p>
            <a href="/services">
              <Button className="hero-btn" style={styles.heroBtn}>
                Explore Services →
              </Button>
            </a>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <Container>
          <h2 style={styles.sectionTitle}>
            Why Choose ServiceBooking?
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="feature-card" style={styles.featureCard}>
                <Card.Body className="text-center p-4">
                  <div className="feature-icon" style={styles.featureIcon}>🚀</div>
                  <h3 style={styles.featureTitle}>Lightning Fast</h3>
                  <p style={styles.featureText}>
                    Book your favorite services in seconds. Our streamlined process makes scheduling effortless and quick.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card" style={styles.featureCard}>
                <Card.Body className="text-center p-4">
                  <div className="feature-icon" style={styles.featureIcon}>✅</div>
                  <h3 style={styles.featureTitle}>Trusted Professionals</h3>
                  <p style={styles.featureText}>
                    All service providers are carefully vetted and verified to ensure the highest quality standards.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card" style={styles.featureCard}>
                <Card.Body className="text-center p-4">
                  <div className="feature-icon" style={styles.featureIcon}>💰</div>
                  <h3 style={styles.featureTitle}>Best Prices</h3>
                  <p style={styles.featureText}>
                    Experience exceptional service quality at competitive prices. Your satisfaction is our priority.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-4 mt-3">
            <Col md={4}>
              <Card className="feature-card" style={styles.featureCard}>
                <Card.Body className="text-center p-4">
                  <div className="feature-icon" style={styles.featureIcon}>📱</div>
                  <h3 style={styles.featureTitle}>Mobile Friendly</h3>
                  <p style={styles.featureText}>
                    Access our platform from any device, anywhere, anytime. Seamless experience on all screens.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card" style={styles.featureCard}>
                <Card.Body className="text-center p-4">
                  <div className="feature-icon" style={styles.featureIcon}>🔔</div>
                  <h3 style={styles.featureTitle}>Smart Notifications</h3>
                  <p style={styles.featureText}>
                    Stay updated with real-time notifications about your bookings and appointments.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card" style={styles.featureCard}>
                <Card.Body className="text-center p-4">
                  <div className="feature-icon" style={styles.featureIcon}>⭐</div>
                  <h3 style={styles.featureTitle}>Easy Management</h3>
                  <p style={styles.featureText}>
                    Track and manage all your bookings from one convenient dashboard. Simple and intuitive.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* About Us Section - Parallax with Background Image */}
      <div style={styles.aboutSection}>
        <div style={styles.aboutOverlay}></div>
        <Container className="text-center" style={styles.aboutContent}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '1.5rem' }}>
            Why Choose ServiceBooking
          </h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: '1.8', textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            We're revolutionizing the service booking industry by connecting customers with verified professionals across Pakistan. Our platform makes it simple, fast, and secure to book any service you need.
          </p>
          <Row className="justify-content-center">
            <Col md={8}>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
                From home repairs to beauty services, from auto maintenance to tech support - we've got you covered. Join thousands of satisfied customers who trust ServiceBooking for their everyday service needs.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Animated Stats Section - Shorter Height */}
      <div ref={statsRef} style={styles.statsSection}>
        <Container>
          <h2 style={{ ...styles.sectionTitle, marginBottom: '3rem' }}>
            Our Impact in Numbers
          </h2>
          <Row className="text-center">
            <Col md={3} className="mb-3">
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{counts.providers}+</div>
                <p style={styles.statLabel}>Service Providers</p>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{counts.customers.toLocaleString()}+</div>
                <p style={styles.statLabel}>Happy Customers</p>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{counts.categories}+</div>
                <p style={styles.statLabel}>Service Categories</p>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{counts.rating}/5</div>
                <p style={styles.statLabel}>Average Rating</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;