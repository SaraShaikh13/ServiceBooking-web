import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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
    contactCard: {
      border: 'none',
      borderRadius: '15px',
      padding: '2rem',
      height: '100%',
      background: 'white',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    },
    contactIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      color: '#667eea',
    },
    contactTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '0.5rem',
    },
    contactText: {
      color: '#718096',
      fontSize: '1rem',
    },
    formCard: {
      border: 'none',
      borderRadius: '15px',
      padding: '2.5rem',
      background: 'white',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    },
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.headerSection}>
        <Container>
          <h1 style={styles.pageTitle}>Contact Us</h1>
          <p style={styles.subtitle}>
            We'd love to hear from you. Get in touch with us!
          </p>
        </Container>
      </div>

      <Container className="pb-5">
        {/* Contact Info Cards */}
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card style={styles.contactCard}>
              <div className="text-center">
                <div style={styles.contactIcon}>📍</div>
                <h3 style={styles.contactTitle}>Visit Us</h3>
                <p style={styles.contactText}>
                  123 Service Street<br />
                  Business District<br />
                  Karachi, Sindh 75500<br />
                  Pakistan
                </p>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={styles.contactCard}>
              <div className="text-center">
                <div style={styles.contactIcon}>📧</div>
                <h3 style={styles.contactTitle}>Email Us</h3>
                <p style={styles.contactText}>
                  <a href="mailto:support@servicebooking.com" style={{ color: '#667eea', textDecoration: 'none' }}>
                    support@servicebooking.com
                  </a>
                  <br />
                  <a href="mailto:info@servicebooking.com" style={{ color: '#667eea', textDecoration: 'none' }}>
                    info@servicebooking.com
                  </a>
                </p>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={styles.contactCard}>
              <div className="text-center">
                <div style={styles.contactIcon}>📞</div>
                <h3 style={styles.contactTitle}>Call Us</h3>
                <p style={styles.contactText}>
                  <a href="tel:+923001234567" style={{ color: '#667eea', textDecoration: 'none' }}>
                    +92 300 1234567
                  </a>
                  <br />
                  <a href="tel:+922134567890" style={{ color: '#667eea', textDecoration: 'none' }}>
                    +92 21 3456 7890
                  </a>
                  <br />
                  <small style={{ color: '#95a5a6' }}>Mon-Sat: 9 AM - 8 PM</small>
                </p>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Contact Form */}
        <Row>
          <Col lg={8} className="mx-auto">
            <Card style={styles.formCard}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#2d3748' }}>
                Send us a Message
              </h2>

              {submitted && (
                <div className="alert alert-success mb-4">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Your Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                  />
                </Form.Group>

                <Button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    padding: '0.8rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '10px',
                  }}
                >
                  Send Message
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;