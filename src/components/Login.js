import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 

const Login = ({ setToken }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.email || !form.password) {
            setMessage('Please fill out all fields.');
            return;
        }

        axios.post('https://presidio-rentify-z0pe.onrender.com/login', form)
            .then(response => {
                setToken(response.data.token);
                setMessage('Logged in successfully!');
            })
            .catch(error => {
                setMessage('There was an error logging in!');
                console.error('There was an error logging in!', error);
            });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={form.password} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
