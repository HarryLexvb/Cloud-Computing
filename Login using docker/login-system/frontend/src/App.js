import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? 
              <Login setAuth={setAuth} /> : 
              <Navigate to="/dashboard" />
            } 
          />
          <Route 
            path="/register" 
            element={
              !isAuthenticated ? 
              <Register setAuth={setAuth} /> : 
              <Navigate to="/dashboard" />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard setAuth={setAuth} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
