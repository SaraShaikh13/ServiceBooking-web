import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #2d3436 0%, #000000 100%)',
      color: 'white',
      padding: '4rem 0 2rem',
      marginTop: 'auto',
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: 'white',
    },
    description: {
      color: '#b2bec3',
      lineHeight: '1.8',
      marginBottom: '1.5rem',
    },
    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    link: {
      color: '#b2bec3',
      textDecoration: 'none',
      display: 'block',
      marginBottom: '0.8rem',
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '1rem',
      color: '#b2bec3',
    },
    contactIcon: {
      fontSize: '1.2rem',
      marginRight: '1rem',
      marginTop: '0.2rem',
      color: '#667eea',
    },
    socialSection: {
      marginTop: '2rem',
    },
    socialTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: 'white',
    },
    socialIcons: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    socialIcon: {
      width: '45px',
      height: '45px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.3rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '2px solid rgba(255,255,255,0.1)',
      color: 'white',
    },
    copyright: {
      borderTop: '1px solid rgba(255,255,255,0.1)',
      paddingTop: '2rem',
      marginTop: '3rem',
      textAlign: 'center',
      color: '#b2bec3',
      fontSize: '0.9rem',
    },
    brandSection: {
      marginBottom: '2rem',
    },
    brandName: {
      fontSize: '1.8rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem',
    },
  };

  return (
    <>
      <style>{`
        .footer-link:hover {
          color: #667eea !important;
          transform: translateX(5px);
        }
        
        .social-icon:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,0.3) !important;
        }
        
        .social-icon.facebook:hover {
          background: #1877f2;
          border-color: #1877f2 !important;
        }
        
        .social-icon.twitter:hover {
          background: #1da1f2;
          border-color: #1da1f2 !important;
        }
        
        .social-icon.instagram:hover {
          background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
          border-color: transparent !important;
        }
        
        .social-icon.linkedin:hover {
          background: #0077b5;
          border-color: #0077b5 !important;
        }
        
        .social-icon.whatsapp:hover {
          background: #25d366;
          border-color: #25d366 !important;
        }
        
        .social-icon.youtube:hover {
          background: #ff0000;
          border-color: #ff0000 !important;
        }
      `}</style>

      <footer style={styles.footer}>
        <Container>
          <Row>
            {/* Brand & About */}
            <Col md={4} className="mb-4">
              <div style={styles.brandSection}>
                <h3 style={styles.brandName}>✨ ServiceBooking</h3>
                <p style={styles.description}>
                  Your trusted platform for booking professional services online. We connect you with verified service providers for all your needs.
                </p>
              </div>
              
              <div style={styles.socialSection}>
                <h5 style={styles.socialTitle}>Follow Us</h5>
                <div style={styles.socialIcons}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon facebook" style={styles.socialIcon}>
                      <i className="fab fa-facebook-f"></i>
                    </div>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon twitter" style={styles.socialIcon}>
                      <i className="fab fa-twitter"></i>
                    </div>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon instagram" style={styles.socialIcon}>
                      <i className="fab fa-instagram"></i>
                    </div>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon linkedin" style={styles.socialIcon}>
                      <i className="fab fa-linkedin-in"></i>
                    </div>
                  </a>
                  <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon whatsapp" style={styles.socialIcon}>
                      <i className="fab fa-whatsapp"></i>
                    </div>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon youtube" style={styles.socialIcon}>
                      <i className="fab fa-youtube"></i>
                    </div>
                  </a>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col md={3} className="mb-4">
              <h5 style={styles.sectionTitle}>Quick Links</h5>
              <ul style={styles.linkList}>
                <li>
                  <Link to="/" className="footer-link" style={styles.link}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="footer-link" style={styles.link}>
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="footer-link" style={styles.link}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link" style={styles.link}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="footer-link" style={styles.link}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="footer-link" style={styles.link}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="footer-link" style={styles.link}>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col md={5} className="mb-4">
              <h5 style={styles.sectionTitle}>Contact Us</h5>
              
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>📍</div>
                <div>
                  <strong style={{ color: 'white', display: 'block', marginBottom: '0.3rem' }}>
                    Address
                  </strong>
                  123 Service Street, Business District<br />
                  Karachi, Sindh 75500, Pakistan
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>📧</div>
                <div>
                  <strong style={{ color: 'white', display: 'block', marginBottom: '0.3rem' }}>
                    Email
                  </strong>
                  <a href="mailto:support@servicebooking.com" style={{ color: '#667eea', textDecoration: 'none' }}>
                    support@servicebooking.com
                  </a>
                  <br />
                  <a href="mailto:info@servicebooking.com" style={{ color: '#667eea', textDecoration: 'none' }}>
                    info@servicebooking.com
                  </a>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>📞</div>
                <div>
                  <strong style={{ color: 'white', display: 'block', marginBottom: '0.3rem' }}>
                    Phone
                  </strong>
                  <a href="tel:1111-22222" style={{ color: '#b2bec3', textDecoration: 'none' }}>
                    1111-22222
                  </a>
                  <br />
                  <a href="tel:77777-66666" style={{ color: '#b2bec3', textDecoration: 'none' }}>
                    77777-66666
                  </a>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#95a5a6' }}>
                    Mon - Sat: 9:00 AM - 8:00 PM
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <div style={styles.copyright}>
            <p className="mb-2">
              &copy; {new Date().getFullYear()} ServiceBooking. All rights reserved.
            </p>
            <p className="mb-0" style={{ fontSize: '0.85rem' }}>
              Made with 💜 by Sara Shaikh 
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;