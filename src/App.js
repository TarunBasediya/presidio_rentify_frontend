import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css"
import Register from './components/Register';
import Login from './components/Login';
import AddProperty from './components/AddProperty';
import PropertyList from './components/PropertyList';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleSetToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div className="container">
                <nav className="navbar">
                    <ul className="nav-list">
                        <li><a href="/">Home</a></li>
                        {!token && <li><a href="/register">Register</a></li>}
                        {!token && <li><a href="/login">Login</a></li>}
                        {token && <li><a href="/add-property">Add Property</a></li>}
                        {token && <li><a href="/properties">Property List</a></li>}
                        {token && <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<h1 className="welcome-text">Welcome to Rentify</h1>} />
                    <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
                    <Route path="/login" element={!token ? <Login setToken={handleSetToken} /> : <Navigate to="/" />} />
                    <Route path="/add-property" element={token ? <AddProperty token={token} /> : <Navigate to="/login" />} />
                    <Route path="/properties" element={<PropertyList token={token} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
