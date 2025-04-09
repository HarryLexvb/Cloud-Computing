import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  async function getName() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setName(response.data.name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <h3>Bienvenido, {name}!</h3>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;