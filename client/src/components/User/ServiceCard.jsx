import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/book/${service._id}`, { state: { service } });
  };

  const styles = {
    card: {
      border: 'none',
      borderRadius: '20px',
      overflow: 'hidden',
      height: '100%',
      background: 'linear-gradient(145deg, #ffffff, #faf9ff)',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.15)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
    },
    cardHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2.5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    },
    iconWrapper: {
      width: '80px',
      height: '80px',
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.25)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      fontSize: '2.5rem',
      border: '2px solid rgba(255,255,255,0.3)',
      color: 'white',
      fontWeight: '700',
    },
    cardBody: {
      padding: '2rem 1.5rem',
    },
    serviceName: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '1rem',
      lineHeight: '1.3',
    },
    description: {
      color: '#718096',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      minHeight: '65px',
    },
    detailsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      borderTop: '2px solid #f0ebff',
      marginBottom: '1.5rem',
    },
    detailItem: {
      textAlign: 'center',
    },
    detailLabel: {
      fontSize: '0.75rem',
      color: '#a0aec0',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '0.3rem',
      fontWeight: '600',
    },
    detailValue: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#667eea',
    },
    priceValue: {
      fontSize: '1.8rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    bookButton: {
      width: '100%',
      padding: '0.9rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      fontWeight: '600',
      fontSize: '1rem',
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    },
    categoryBadge: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'rgba(255,255,255,0.25)',
      backdropFilter: 'blur(10px)',
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.4)',
    },
    decorativeCircle: {
      position: 'absolute',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.1)',
      top: '-50px',
      right: '-50px',
    },
  };

  return (
    <>
      <style>{`
        .elegant-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.25) !important;
        }
        
        .book-btn:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4) !important;
        }
        
        .icon-wrapper {
          transition: all 0.3s ease;
        }
        
        .elegant-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          background: rgba(255,255,255,0.35);
        }
        
        .elegant-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .elegant-card:hover::before {
          opacity: 1;
        }
      `}</style>

      <Card className="elegant-card" style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.decorativeCircle}></div>
          <div className="icon-wrapper" style={styles.iconWrapper}>
            {service.name.charAt(0).toUpperCase()}
          </div>
          {service.category && (
            <div style={styles.categoryBadge}>
              {service.category}
            </div>
          )}
        </div>
        
        <Card.Body style={styles.cardBody}>
          <h3 style={styles.serviceName}>
            {service.name}
          </h3>
          
          <p style={styles.description}>
            {service.description}
          </p>
          
          <div style={styles.detailsRow}>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Duration</div>
              <div style={styles.detailValue}>{service.duration}m</div>
            </div>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Price</div>
              <div style={styles.priceValue}>${service.price}</div>
            </div>
          </div>
          
          <Button 
            className="book-btn"
            style={styles.bookButton}
            onClick={handleBookNow}
          >
            Book Service
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ServiceCard;