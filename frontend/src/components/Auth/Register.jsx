import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '@picocss/pico/css/pico.min.css'; 
import { useAuthStore } from '../../store/authStore';
import Spinner from '../common/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);

    try {
      await signup(formData.email, formData.password, formData.username);
      navigate("/")
    } catch (error) {
      
    }

  };

  return (
    <main className="container">
      <article className="card" style={{ maxWidth: '500px', margin: 'auto', padding: '1.5rem' }}>
        <header>
          <h2>Sign Up</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <small id="invalid-helper"> {error} </small>}
          
          {/* //check pico for animations */}
          <button type="submit" className="primary" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Sign Up"} 
          </button>
        </form>

        <footer>
          <p>Already have an account? <a href="/login">Login here</a></p>
        </footer>
      </article>
    </main>
  );
};

export default Register;
