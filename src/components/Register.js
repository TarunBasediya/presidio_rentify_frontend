import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; 

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'buyer'
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
        if (!form.firstName || !form.lastName || !form.email || !form.phoneNumber || !form.password) {
            setMessage('Please fill out all fields.');
            return;
        }

        axios.post('https://presidio-rentify-z0pe.onrender.com/register', form)
            .then(response => {
                setMessage('Registered successfully!');
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    role: 'buyer'
                });
            })
            .catch(error => {
                setMessage('There was an error registering!');
                console.error('There was an error registering!', error);
            });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>First Name:</label>
                <input 
                    type="text" 
                    name="firstName" 
                    value={form.firstName} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input 
                    type="text" 
                    name="lastName" 
                    value={form.lastName} 
                    onChange={handleChange} 
                    required
                />
            </div>
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
                <label>Phone Number:</label>
                <input 
                    type="text" 
                    name="phoneNumber" 
                    value={form.phoneNumber} 
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
            <div>
                <label>Role:</label>
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
            </div>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;
