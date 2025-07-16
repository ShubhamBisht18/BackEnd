import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetOtp from "./pages/VerifyResetOtp"; 
import ResetPassword from "./pages/ResetPassword";  
import Home from "./pages/Home";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} /> 
        <Route path="/reset-password" element={<ResetPassword />} />  
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
