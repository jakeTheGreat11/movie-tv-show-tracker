import './App.css'
import Login from './components/Auth/login';
import Register from './components/Auth/Register'; 
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import HomePage from './Pages/HomePage';

// redirect authenticated user to home page
const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children;
}

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  return (
    <>
      <Routes> 
        <Route 
        path='/' 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
          } 
        />  {/* put the protected route on this*/}
        <Route 
          path='/register' 
          element={
            <RedirectAuthenticatedUser>
              <Register />
            </RedirectAuthenticatedUser>
          }
        />
        <Route 
          path='/login' 
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        /> 
      </Routes>
    </>
  )
}

export default App
