import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './propertylist.css'; // Import CSS file

const PropertyList = ({ token }) => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        bedrooms: '',
        bathrooms: '',
        minRent: '',
        maxRent: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('https://presidio-rentify-z0pe.onrender.com/properties')
            .then(response => {
                setProperties(response.data);
                setFilteredProperties(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the properties!', error);
            });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const applyFilters = () => {
        let filtered = properties;
        if (filters.location) {
            filtered = filtered.filter(property => property.location.toLowerCase().includes(filters.location.toLowerCase()));
        }
        if (filters.bedrooms) {
            filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms, 10));
        }
        if (filters.bathrooms) {
            filtered = filtered.filter(property => property.bathrooms >= parseInt(filters.bathrooms, 10));
        }
        if (filters.minRent) {
            filtered = filtered.filter(property => property.rent >= parseInt(filters.minRent, 10));
        }
        if (filters.maxRent) {
            filtered = filtered.filter(property => property.rent <= parseInt(filters.maxRent, 10));
        }
        setFilteredProperties(filtered);
    };

    const handleInterest = (sellerDetails) => {
        setMessage(`Contact Seller: ${sellerDetails.name}, Email: ${sellerDetails.email}, Phone: ${sellerDetails.phone}`);
    };

    return (
        <div className="property-list">
            <h2 className="property-heading">Properties</h2>
            <div className="filter-section">
                <h3>Filters</h3>
                <div>
                    <label>Location:</label>
                    <input className="filter-input" type="text" name="location" value={filters.location} onChange={handleFilterChange} />
                </div>
                <div>
                    <label>Bedrooms:</label>
                    <input className="filter-input" type="number" name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange} />
                </div>
                <div>
                    <label>Bathrooms:</label>
                    <input className="filter-input" type="number" name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange} />
                </div>
                <div>
                    <label>Min Rent:</label>
                    <input className="filter-input" type="number" name="minRent" value={filters.minRent} onChange={handleFilterChange} />
                </div>
                <div>
                    <label>Max Rent:</label>
                    <input className="filter-input" type="number" name="maxRent" value={filters.maxRent} onChange={handleFilterChange} />
                </div>
                <button className="apply-filters-btn" onClick={applyFilters}>Apply Filters</button>
            </div>
            <div className="property-container">
                {filteredProperties.map(property => (
                    <div key={property.id} className="property-card">
                        <h3>{property.title}</h3>
                        <p>{property.description}</p>
                        <p>Location: {property.location}</p>
                        <p>Bedrooms: {property.bedrooms}</p>
                        <p>Bathrooms: {property.bathrooms}</p>
                        <p>Rent: ${property.rent}</p>
                        <button className="interest-btn" onClick={() => handleInterest(property.sellerDetails)}>I'm Interested</button>
                    </div>
                ))}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PropertyList;
