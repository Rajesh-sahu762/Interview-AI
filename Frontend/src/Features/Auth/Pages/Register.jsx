import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth.js';

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [formError, setFormError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister(username, email, password);
    if (result.success) {
      navigate('/login');
    } else {
      setFormError(result.message);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className='Auth-main'>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">UserName</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="name"
              placeholder='Enter Your UserName' />
          </div>
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
          <button className='button primary-btn' type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link> </p>
      </div>
    </main>
  )
}

export default Register