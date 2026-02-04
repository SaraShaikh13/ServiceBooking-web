import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/services');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '80vh' }}
    >
      <Card style={{ maxWidth: '500px', width: '100%' }} className="shadow">
        <Card.Body className="p-5">
          <h2 className="text-center mb-4 fw-bold">
            Login to Your Account
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                Password
              </Form.Label>

              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />

              <Form.Check
  type="checkbox"
  label={<span style={{ fontSize: '0.70rem' }}>Show password</span>}
  className="mt-2"
  style={{ opacity: 0.8 }}
  checked={showPassword}
  onChange={() => setShowPassword(!showPassword)}
/>

            </Form.Group>

            {/* Login Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 fw-semibold"
              disabled={loading}
              style={{
                background:
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>

          {/* Register Link */}
          <p className="text-center mt-4 mb-0">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="fw-semibold"
              style={{ color: '#667eea' }}
            >
              Register here
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
