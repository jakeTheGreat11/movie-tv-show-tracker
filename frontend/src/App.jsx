import "./App.css";
import Login from "./components/Auth/login";
import Register from "./components/Auth/Register";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// redirect authenticated user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  // Condittionally show header and footer
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectAuthenticatedUser>
              <Register />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
