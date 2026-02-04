import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import NavigationBar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import PrivateRoute from './components/Common/PrivateRoute';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// User Components
import BookingForm from './components/User/BookingForm';
import MyBookings from './components/User/MyBookings';

// Admin Components
import Dashboard from './components/Admin/Dashboard';
import ManageServices from './components/Admin/ManageServices';
import ManageBookings from './components/Admin/ManageBookings';
import ManageUsers from './components/Admin/ManageUsers';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <NavigationBar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* User Routes (Protected) */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book/:id"
                element={
                  <PrivateRoute>
                    <BookingForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes (Protected) */}
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute adminOnly={true}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <PrivateRoute adminOnly={true}>
                    <ManageServices />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <PrivateRoute adminOnly={true}>
                    <ManageBookings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <PrivateRoute adminOnly={true}>
                    <ManageUsers />
                  </PrivateRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;