import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyResetOtp from "./pages/Auth/VerifyResetOtp";
import ResetPassword from "./pages/Auth/ResetPassword";
import { AuthProvider } from "./context/AuthContext";

import Home from './pages/Main/Home';
import About from './pages/Main/About';
import Contact from './pages/Main/Contact';
import Men from './pages/Main/Men';
import Women from './pages/Main/Women';
import MyOrder from './pages/Main/MyOrder';
import Cart from "./pages/Main/Cart";

import Dashboard from './pages/Main/Dashboard';
import AddItem from './pages/Main/AddItem';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected + Layout Routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-order" element={<MyOrder />} />
          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
          <Route path="cart/:id" element={<Cart />} />


          {/* Admin Routes */}
          <Route path="dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="add-item" element={<AdminRoute><AddItem /></AdminRoute>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
