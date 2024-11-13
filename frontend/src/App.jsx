import "./App.css";
import Login from "./components/Auth/login";
import Register from "./components/Auth/Register";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import DiscoverPageMovies from "./Pages/DiscoverPage";
import MediaPage from "./Pages/MediaPage";
import ProfilePage from "./Pages/ProfilePage";

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
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <article aria-busy="true"></article>; // Show a loading spinner while checking auth status
  }

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
      <div className="app-container">
        {!isAuthPage && <Header />}
        <main className="main-content">
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
            <Route
              path="/movies/discover"
              element={<DiscoverPageMovies mediaType={"movies"} />}
            />
            <Route
              path="/tv-shows/discover"
              element={<DiscoverPageMovies mediaType={"tv-shows"} />}
            />
            <Route path="/:mediaType/:id" element={<MediaPage />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </>
  );
}

export default App;
