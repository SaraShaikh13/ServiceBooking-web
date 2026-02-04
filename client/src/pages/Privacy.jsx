import { Container } from 'react-bootstrap';

const Privacy = () => {
  const styles = {
    headerSection: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '5rem 0',
      color: 'white',
      marginBottom: '3rem',
    },
    pageTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '1.1rem',
      textAlign: 'center',
      opacity: 0.9,
    },
    content: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 1rem 4rem',
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#2d3748',
      marginTop: '2rem',
      marginBottom: '1rem',
    },
    paragraph: {
      fontSize: '1.05rem',
      lineHeight: '1.8',
      color: '#4a5568',
      marginBottom: '1.5rem',
    },
    list: {
      fontSize: '1.05rem',
      lineHeight: '1.8',
      color: '#4a5568',
      marginBottom: '1.5rem',
      paddingLeft: '2rem',
    },
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.headerSection}>
        <Container>
          <h1 style={styles.pageTitle}>Privacy Policy</h1>
          <p style={styles.subtitle}>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </Container>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <p style={styles.paragraph}>
          At ServiceBooking, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service booking platform.
        </p>

        <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
        <p style={styles.paragraph}>
          We collect information that you provide directly to us, including:
        </p>
        <ul style={styles.list}>
          <li>Name, email address, and phone number</li>
          <li>Account credentials (username and password)</li>
          <li>Booking details and service preferences</li>
          <li>Payment information (processed securely through third-party providers)</li>
          <li>Communication records with service providers and support team</li>
        </ul>

        <h2 style={styles.sectionTitle}>2. How We Use Your Information</h2>
        <p style={styles.paragraph}>
          We use the collected information for the following purposes:
        </p>
        <ul style={styles.list}>
          <li>To provide, maintain, and improve our services</li>
          <li>To process your bookings and transactions</li>
          <li>To communicate with you about your bookings and account</li>
          <li>To send you promotional materials and updates (with your consent)</li>
          <li>To detect and prevent fraud and abuse</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 style={styles.sectionTitle}>3. Information Sharing</h2>
        <p style={styles.paragraph}>
          We may share your information in the following circumstances:
        </p>
        <ul style={styles.list}>
          <li><strong>With Service Providers:</strong> We share necessary booking information with service providers to fulfill your requests</li>
          <li><strong>With Payment Processors:</strong> Payment information is shared with secure third-party payment processors</li>
          <li><strong>For Legal Compliance:</strong> When required by law or to protect our rights and safety</li>
          <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
        </ul>

        <h2 style={styles.sectionTitle}>4. Data Security</h2>
        <p style={styles.paragraph}>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
        </p>

        <h2 style={styles.sectionTitle}>5. Your Rights</h2>
        <p style={styles.paragraph}>
          You have the following rights regarding your personal information:
        </p>
        <ul style={styles.list}>
          <li>Access and review your personal information</li>
          <li>Correct or update inaccurate information</li>
          <li>Request deletion of your account and data</li>
          <li>Opt-out of marketing communications</li>
          <li>Export your data in a portable format</li>
        </ul>

        <h2 style={styles.sectionTitle}>6. Cookies and Tracking</h2>
        <p style={styles.paragraph}>
          We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookie preferences through your browser settings.
        </p>

        <h2 style={styles.sectionTitle}>7. Children's Privacy</h2>
        <p style={styles.paragraph}>
          Our services are not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information.
        </p>

        <h2 style={styles.sectionTitle}>8. Changes to Privacy Policy</h2>
        <p style={styles.paragraph}>
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last updated" date.
        </p>

        <h2 style={styles.sectionTitle}>9. Contact Us</h2>
        <p style={styles.paragraph}>
          If you have any questions about this Privacy Policy or our data practices, please contact us at:
        </p>
        <ul style={styles.list}>
          <li>Email: privacy@servicebooking.com</li>
          <li>Phone: +92 300 1234567</li>
          <li>Address: 123 Service Street, Karachi, Sindh 75500, Pakistan</li>
        </ul>
      </div>
    </div>
  );
};

export default Privacy;