import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const NavigationBar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navbarStyle = {
    backgroundColor: '#000000',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  };

  const brandStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.5px',
  };

  const navLinkStyle = {
    color: '#ffffff',
    marginLeft: '1rem',
    transition: 'all 0.3s ease',
  };

  return (
    <>
      <style>{`
        .navbar-dark .nav-link:hover {
          color: #667eea !important;
          transform: translateY(-2px);
        }
        
        .navbar-brand:hover {
          color: #667eea !important;
        }
        
        .dropdown-menu {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 0.5rem;
        }
        
        .dropdown-item {
          color: #ffffff;
          padding: 0.7rem 1rem;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        
        .dropdown-item:hover {
          background: #667eea;
          color: white;
        }
        
        .dropdown-toggle::after {
          margin-left: 0.5rem;
        }
        
        .username-link {
          color: #ffffff;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          background: rgba(102, 126, 234, 0.2);
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 0.9rem;
          border: 2px solid transparent;
        }
        
        .username-link:hover {
          background: rgba(102, 126, 234, 0.4);
          border-color: #667eea;
          color: white;
          transform: translateY(-2px);
        }
      `}</style>

      <Navbar style={navbarStyle} variant="dark" expand="lg" className="shadow">
        <Container>
          <Navbar.Brand as={Link} to="/" style={brandStyle}>
            ✨ ServiceBooking
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" style={navLinkStyle}>Home</Nav.Link>
              <Nav.Link as={Link} to="/services" style={navLinkStyle}>Services</Nav.Link>
              
              {/* More Menu Dropdown */}
              <NavDropdown 
                title="More" 
                id="more-dropdown" 
                style={navLinkStyle}
                align="end"
              >
                <NavDropdown.Item as={Link} to="/about">
                  About Us
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact">
                  Contact
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/careers">
                  Careers
                </NavDropdown.Item>
                <NavDropdown.Divider style={{ borderColor: '#333' }} />
                <NavDropdown.Item as={Link} to="/privacy">
                  Privacy Policy
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/terms">
                  Terms of Service
                </NavDropdown.Item>
              </NavDropdown>

              {user ? (
                <>
                  {isAdmin ? (
                    <Nav.Link as={Link} to="/admin/dashboard" style={navLinkStyle}>
                       Dashboard
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/my-bookings" style={navLinkStyle}>
                      My Bookings
                    </Nav.Link>
                  )}
                  
                  {/* Clickable Username */}
                  <Link to="/profile" className="username-link ms-3">
                    {isAdmin ? ' ' : '👤'} {user.name}
                  </Link>
                  
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={handleLogout}
                    className="ms-3"
                    style={{ 
                      borderRadius: '20px',
                      padding: '0.5rem 1.5rem',
                      fontWeight: '600'
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <Button 
                      variant="light" 
                      size="sm"
                      style={{ 
                        borderRadius: '20px',
                        padding: '0.5rem 1.5rem',
                        fontWeight: '600',
                        marginLeft: '0.5rem'
                      }}
                    >
                      Login
                    </Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <Button 
                      variant="outline-light" 
                      size="sm"
                      style={{ 
                        borderRadius: '20px',
                        padding: '0.5rem 1.5rem',
                        fontWeight: '600'
                      }}
                    >
                      Register
                    </Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;