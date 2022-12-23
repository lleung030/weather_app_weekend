import logo from './logo.svg';
import './App.css';
import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './contexts/AuthProvider'


export default function App() {
  const { login, logout, user } = useContext(AuthContext)
  
  return (
    <div className="App">
      <h2>Welcome to the Weather App</h2>
      <h2>Please Login to Continue</h2>
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/counter">Counter</Link></li>
            {
              (user.loggedIn) ?
              <li><button onClick={logout}>Logout</button></li> :
              <li><button onClick={login}>Login</button></li>
            }
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

