import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';



async function loginUser(credentials) {
 return fetch('http://localhost:3001/oauth/token', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login( { setToken } ) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const clientSecret = "SzUGcPjkWkiX0gn_ci5QxYr_8FCp9U0c3Tj5MY3RwKw"
  const clientId = "3Uym47aWETUuB1rxpVP7erzyazFNMidB5Gp3FpdHwtw"
  const grantType = password

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      grantType,
      email,
      password,
      clientId,
      clientSecret
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}