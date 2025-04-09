import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        setMessage("Login exitoso!");
      } 
    } catch (err) {
      console.error(err.response.data);
      setMessage(err.response.data.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p className={`message ${message === "Login exitoso!" ? "success" : "error"}`}>{message}</p>}
      <Link to="/register" className="link">¿No tienes una cuenta? Regístrate</Link>
    </>
  );
};

export default Login;