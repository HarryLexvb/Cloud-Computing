import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        setMessage("Registro exitoso!");
      }
    } catch (err) {
      console.error(err.response.data);
      setMessage(err.response.data.message || "Error al registrarse");
    }
  };

  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={onChange}
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
      {message && <p className={`message ${message === "Registro exitoso!" ? "success" : "error"}`}>{message}</p>}
      <Link to="/login" className="link">¿Ya tienes una cuenta? Inicia sesión</Link>
    </>
  );
};

export default Register;