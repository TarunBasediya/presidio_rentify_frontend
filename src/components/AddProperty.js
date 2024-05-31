import React, { useState } from 'react';
import axios from 'axios';
import './addproperty.css'; 

const AddProperty = ({ token }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        bedrooms: 0,
        bathrooms: 0,
        rent: 0
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'rent' ? parseInt(value, 10) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.title || !form.description || !form.location || form.bedrooms <= 0 || form.bathrooms <= 0 || form.rent <= 0) {
            setMessage('Please fill out all fields with valid values.');
            return;
        }

        axios.post('https://presidio-rentify-z0pe.onrender.com/properties', form, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setMessage('Property added successfully!');
                setForm({
                    title: '',
                    description: '',
                    location: '',
                    bedrooms: 0,
                    bathrooms: 0,
                    rent: 0
                });
            })
            .catch(error => {
                setMessage('There was an error adding the property!');
                console.error('There was an error adding the property!', error);
            });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    value={form.title} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input 
                    type="text" 
                    name="description" 
                    value={form.description} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input 
                    type="text" 
                    name="location" 
                    value={form.location} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div>
                <label>Bedrooms:</label>
                <input 
                    type="number" 
                    name="bedrooms" 
                    value={form.bedrooms} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div>
                <label>Bathrooms:</label>
                <input 
                    type="number" 
                    name="bathrooms" 
                    value={form.bathrooms} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div>
                <label>Rent:</label>
                <input 
                    type="number" 
                    name="rent" 
                    value={form.rent} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <button type="submit">Add Property</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AddProperty;
