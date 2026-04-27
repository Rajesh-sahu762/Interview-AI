import React from 'react'
import './auth.form.scss'
import { useNavigate, Link } from 'react-router';
const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Enter Your Email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Enter Your Password' />
          </div>
          <button className='button primary-btn' type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link> </p>
      </div>
    </main>
  )
}

export default Login
