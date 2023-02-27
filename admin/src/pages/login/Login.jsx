import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleClick = e => {
    e.preventDefault();
    login(dispatch, { username, password })
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      height: "100vh"
    }}>
      <input 
        type="text" 
        placeholder="username" 
        onChange={e => setUsername(e.target.value)}
        style={{
          padding: 10,
          marginBottom: 20
        }}
      />
      <input 
        type="password" 
        placeholder="password" 
        onChange={e => setPassword(e.target.value)}
        style={{
          padding: 10,
          marginBottom: 20
        }}
      />
      <button 
        onClick={handleClick}
        style={{
          width: 100,
          padding: 10
        }}
      >Login</button>
    </div>
  )
}

export default Login