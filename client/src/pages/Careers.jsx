import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Careers = () => {
  const jobs = [
    {
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Karachi, Pakistan',
      type: 'Full-time',
      description: 'We are looking for an experienced Full Stack Developer to join our growing team.',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Karachi, Pakistan',
      type: 'Full-time',
      description: 'Lead product strategy and development for our service booking platform.',
    },
    {
      title: 'Customer Support Specialist',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our customers have the best experience with our platform.',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Karachi, Pakistan',
      type: 'Full-time',
      description: 'Drive growth through innovative marketing strategies and campaigns.',
    },
  ];

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
      opacity: 0.9
    },
    jobCard: {
      border: 'none',
      borderRadius: '15px',
      padding: '2rem',
      background: 'white',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      height: '100%',
    },
    jobTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '1rem',
    },
    jobMeta: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    },
    badge: {
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: '#2d3748',
      textAlign: 'center',
    },
  };

  return (
    <>
      <style>{`
        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
      `}</style>

      <div>
        {/* Header */}
        <div style={styles.headerSection}>
          <Container>
            <h1 style={styles.pageTitle}>Join Our Team</h1>
            <p style={styles.subtitle}>
              Help us revolutionize the service booking industry
            </p>
          </Container>
        </div>

        <Container className="pb-5">
          {/* Why Work With Us */}
          <section className="mb-5">
            <h2 style={styles.sectionTitle}>Why Work With Us?</h2>
            <Row className="g-4 mb-5">
              <Col md={4}>
                <Card style={{ ...styles.jobCard, textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Innovation
                  </h3>
                  <p style={{ color: '#718096' }}>
                    Work on cutting-edge technology and innovative solutions
                  </p>
                </Card>
              </Col>

              <Col md={4}>
                <Card style={{ ...styles.jobCard, textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Growth
                  </h3>
                  <p style={{ color: '#718096' }}>
                    Continuous learning and career development opportunities
                  </p>
                </Card>
              </Col>

              <Col md={4}>
                <Card style={{ ...styles.jobCard, textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Culture
                  </h3>
                  <p style={{ color: '#718096' }}>
                    Collaborative and inclusive work environment
                  </p>
                </Card>
              </Col>
            </Row>
          </section>

          {/* Open Positions */}
          <section>
            <h2 style={styles.sectionTitle}>Open Positions</h2>
            <Row className="g-4">
              {jobs.map((job, index) => (
                <Col lg={6} key={index}>
                  <Card className="job-card" style={styles.jobCard}>
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    <div style={styles.jobMeta}>
                      <span style={{ ...styles.badge, background: '#e3f2fd', color: '#1976d2' }}>
                        {job.department}
                      </span>
                      <span style={{ ...styles.badge, background: '#f3e5f5', color: '#7b1fa2' }}>
                        📍 {job.location}
                      </span>
                      <span style={{ ...styles.badge, background: '#e8f5e9', color: '#388e3c' }}>
                        {job.type}
                      </span>
                    </div>
                    <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
                      {job.description}
                    </p>
                    <Button
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        padding: '0.6rem 1.5rem',
                        fontWeight: '600',
                        borderRadius: '8px',
                      }}
                    >
                      Apply Now
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* Contact HR */}
          <section className="mt-5 text-center">
            <Card style={{ ...styles.jobCard, maxWidth: '600px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem' }}>
                Don't see a perfect fit?
              </h3>
              <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
                We're always looking for talented individuals. Send us your resume at:
              </p>
              <a href="mailto:careers@servicebooking.com" style={{ color: '#667eea', fontSize: '1.2rem', fontWeight: '600', textDecoration: 'none' }}>
                careers@servicebooking.com
              </a>
            </Card>
          </section>
        </Container>
      </div>
    </>
  );
};

export default Careers;