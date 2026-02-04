import { Container } from 'react-bootstrap';

const Terms = () => {
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
          <h1 style={styles.pageTitle}>Terms of Service</h1>
          <p style={styles.subtitle}>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </Container>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <p style={styles.paragraph}>
          Please read these Terms of Service carefully before using the ServiceBooking platform. By accessing or using our services, you agree to be bound by these terms.
        </p>

        <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
        <p style={styles.paragraph}>
          By creating an account, accessing, or using ServiceBooking, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 style={styles.sectionTitle}>2. Eligibility</h2>
        <p style={styles.paragraph}>
          You must be at least 18 years old to use ServiceBooking. By using our platform, you represent and warrant that you meet this age requirement and have the legal capacity to enter into binding contracts.
        </p>

        <h2 style={styles.sectionTitle}>3. User Accounts</h2>
        <p style={styles.paragraph}>
          To use certain features of our platform, you must create an account. You agree to:
        </p>
        <ul style={styles.list}>
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Not share your account with others</li>
        </ul>

        <h2 style={styles.sectionTitle}>4. Service Bookings</h2>
        <p style={styles.paragraph}>
          When booking services through our platform:
        </p>
        <ul style={styles.list}>
          <li>You enter into a direct agreement with the service provider</li>
          <li>ServiceBooking acts as an intermediary platform</li>
          <li>You are responsible for providing accurate booking information</li>
          <li>Cancellation policies vary by service provider</li>
          <li>Payment terms are clearly displayed before booking confirmation</li>
        </ul>

        <h2 style={styles.sectionTitle}>5. User Conduct</h2>
        <p style={styles.paragraph}>
          You agree not to:
        </p>
        <ul style={styles.list}>
          <li>Use the platform for any illegal or unauthorized purpose</li>
          <li>Harass, abuse, or harm service providers or other users</li>
          <li>Post false, misleading, or fraudulent information</li>
          <li>Interfere with the proper functioning of the platform</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use automated systems to access the platform without permission</li>
        </ul>

        <h2 style={styles.sectionTitle}>6. Service Provider Responsibilities</h2>
        <p style={styles.paragraph}>
          Service providers on our platform agree to:
        </p>
        <ul style={styles.list}>
          <li>Provide services professionally and as described</li>
          <li>Honor confirmed bookings and scheduled appointments</li>
          <li>Maintain necessary licenses and certifications</li>
          <li>Communicate clearly with customers</li>
          <li>Comply with all applicable laws and regulations</li>
        </ul>

        <h2 style={styles.sectionTitle}>7. Payments and Fees</h2>
        <p style={styles.paragraph}>
          Prices for services are determined by service providers and displayed on the platform. ServiceBooking may charge service fees, which will be clearly communicated. All payments are processed securely through third-party payment processors.
        </p>

        <h2 style={styles.sectionTitle}>8. Cancellations and Refunds</h2>
        <p style={styles.paragraph}>
          Cancellation and refund policies vary by service provider and will be displayed at the time of booking. ServiceBooking is not responsible for refunds but will assist in dispute resolution between customers and service providers.
        </p>

        <h2 style={styles.sectionTitle}>9. Disclaimer of Warranties</h2>
        <p style={styles.paragraph}>
          ServiceBooking is provided "as is" without warranties of any kind. We do not guarantee the quality, safety, or legality of services provided by third-party service providers. You use the platform at your own risk.
        </p>

        <h2 style={styles.sectionTitle}>10. Limitation of Liability</h2>
        <p style={styles.paragraph}>
          ServiceBooking shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform or services booked through it. Our total liability shall not exceed the amount paid by you for the specific service in question.
        </p>

        <h2 style={styles.sectionTitle}>11. Dispute Resolution</h2>
        <p style={styles.paragraph}>
          Any disputes arising from these terms or your use of ServiceBooking shall be resolved through good faith negotiation. If negotiation fails, disputes shall be subject to the exclusive jurisdiction of courts in Karachi, Pakistan.
        </p>

        <h2 style={styles.sectionTitle}>12. Changes to Terms</h2>
        <p style={styles.paragraph}>
          We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes by posting a notice on our platform. Your continued use of the platform after changes constitutes acceptance of the modified terms.
        </p>

        <h2 style={styles.sectionTitle}>13. Termination</h2>
        <p style={styles.paragraph}>
          We may suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion. You may terminate your account at any time by contacting us.
        </p>

        <h2 style={styles.sectionTitle}>14. Contact Information</h2>
        <p style={styles.paragraph}>
          For questions about these Terms of Service, please contact us at:
        </p>
        <ul style={styles.list}>
          <li>Email: legal@servicebooking.com</li>
          <li>Phone: 77777-66666</li>
          <li>Address: 123 Service Street, Karachi, Sindh 75500, Pakistan</li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;