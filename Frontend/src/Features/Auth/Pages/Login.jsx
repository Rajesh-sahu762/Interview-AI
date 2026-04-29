import React from 'react'
import './auth.form.scss'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth.js';

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin, error } = useAuth();
  const [formError, setFormError] = React.useState(null);
  
  const[email, setEmail] = React.useState('');
  const[password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setFormError(result.message);
    }
  }

  if(loading) {
    return (<main><h1>Loading...</h1></main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder='Enter Your Email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder='Enter Your Password' />
          </div>
          {formError && <div className="form-error">{formError}</div>}
          <button className='button primary-btn' type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link> </p>
      </div>
    </main>
  )
}

export default Login
