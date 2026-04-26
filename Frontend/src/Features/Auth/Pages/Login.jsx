import React from 'react'
import './auth.form.scss'

const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
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
      </div>
    </main>
  )
}

export default Login
