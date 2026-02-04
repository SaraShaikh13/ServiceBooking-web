import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  const styles = {
    headerSection: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '5rem 0',
      color: 'white',
      marginBottom: '4rem',
    },
    pageTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '1.3rem',
      textAlign: 'center',
      opacity: 0.9,
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: '#2d3748',
    },
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#4a5568',
      marginBottom: '1.5rem',
    },
    valueCard: {
      border: 'none',
      borderRadius: '15px',
      padding: '2rem',
      height: '100%',
      background: '#f8f9fa',
      transition: 'all 0.3s ease',
    },
    valueIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    valueTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '1rem',
    },
    valueText: {
      color: '#718096',
      lineHeight: '1.6',
    },
  };

  return (
    <>
      <style>{`
        .value-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
      `}</style>

      <div>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <Container>
            <h1 style={styles.pageTitle}>About ServiceBooking</h1>
            <p style={styles.subtitle}>
              Connecting people with professional services since 2024
            </p>
          </Container>
        </div>

        {/* Main Content */}
        <Container className="pb-5">
          {/* Our Story */}
          <section className="mb-5">
            <h2 style={styles.sectionTitle}>Our Story</h2>
            <p style={styles.paragraph}>
              ServiceBooking was founded with a simple mission: to make professional services accessible to everyone. We recognized the challenge people face in finding reliable, verified service providers for their everyday needs.
            </p>
            <p style={styles.paragraph}>
              What started as a small platform has grown into a comprehensive service marketplace, connecting thousands of customers with trusted professionals across multiple categories including home services, beauty care, auto services, health, education, delivery, tech services, and events.
            </p>
            <p style={styles.paragraph}>
              Today, we're proud to be the go-to platform for booking professional services online in Pakistan, with a growing network of verified service providers and satisfied customers.
            </p>
          </section>

          {/* Our Mission */}
          <section className="mb-5">
            <h2 style={styles.sectionTitle}>Our Mission</h2>
            <p style={styles.paragraph}>
              To revolutionize the service booking industry by providing a seamless, trustworthy platform that connects customers with verified professionals, making quality services accessible to everyone.
            </p>
          </section>

          {/* Our Values */}
          <section className="mb-5">
            <h2 style={styles.sectionTitle}>Our Values</h2>
            <Row className="g-4">
              <Col md={6} lg={3}>
                <Card className="value-card" style={styles.valueCard}>
                  <div style={styles.valueIcon}>🎯</div>
                  <h3 style={styles.valueTitle}>Quality</h3>
                  <p style={styles.valueText}>
                    We ensure all service providers meet our strict quality standards.
                  </p>
                </Card>
              </Col>

              <Col md={6} lg={3}>
                <Card className="value-card" style={styles.valueCard}>
                  <div style={styles.valueIcon}>🛡️</div>
                  <h3 style={styles.valueTitle}>Trust</h3>
                  <p style={styles.valueText}>
                    Every provider is verified and background-checked for your safety.
                  </p>
                </Card>
              </Col>

              <Col md={6} lg={3}>
                <Card className="value-card" style={styles.valueCard}>
                  <div style={styles.valueIcon}>⚡</div>
                  <h3 style={styles.valueTitle}>Convenience</h3>
                  <p style={styles.valueText}>
                    Book services anytime, anywhere with just a few clicks.
                  </p>
                </Card>
              </Col>

              <Col md={6} lg={3}>
                <Card className="value-card" style={styles.valueCard}>
                  <div style={styles.valueIcon}>💼</div>
                  <h3 style={styles.valueTitle}>Professionalism</h3>
                  <p style={styles.valueText}>
                    We maintain the highest standards of service delivery.
                  </p>
                </Card>
              </Col>
            </Row>
          </section>

          {/* Why Choose Us */}
          <section className="mb-5">
            <h2 style={styles.sectionTitle}>Why Choose ServiceBooking?</h2>
            <Row>
              <Col lg={6}>
                <p style={styles.paragraph}>
                  <strong>✓ Verified Professionals:</strong> All service providers are thoroughly vetted and verified.
                </p>
                <p style={styles.paragraph}>
                  <strong>✓ Transparent Pricing:</strong> Clear pricing with no hidden charges.
                </p>
                <p style={styles.paragraph}>
                  <strong>✓ Easy Booking:</strong> Simple, user-friendly booking process.
                </p>
              </Col>
              <Col lg={6}>
                <p style={styles.paragraph}>
                  <strong>✓ 24/7 Support:</strong> Our customer support team is always available.
                </p>
                <p style={styles.paragraph}>
                  <strong>✓ Quality Assurance:</strong> We monitor service quality and customer satisfaction.
                </p>
                <p style={styles.paragraph}>
                  <strong>✓ Secure Platform:</strong> Your data and payments are protected.
                </p>
              </Col>
            </Row>
          </section>

          {/* Stats */}
          
        </Container>
      </div>
    </>
  );
};

export default About;