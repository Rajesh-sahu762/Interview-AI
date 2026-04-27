import React from 'react'
import { useNavigate, Link} from 'react-router';

const Register = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  }

  return (
   <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">UserName</label>
            <input type="text" id="name" placeholder='Enter Your UserName' />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Enter Your Email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Enter Your Password' />
          </div>
          <button className='button primary-btn' type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link> </p>
      </div>
    </main>
  )
}

export default Register