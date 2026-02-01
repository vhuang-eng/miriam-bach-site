import React, { useState } from 'react';

const RSVPForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        status: "I'm coming!"
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Yay! See you there (or in spirit)!');
                setFormData({ name: '', email: '', status: "I'm coming!" });
            } else {
                setMessage(data.message || 'Something went wrong.');
            }
        } catch (error) {
            setMessage('Error connecting to server.');
        }
    };

    return (
        <div id="rsvp" className="rsvp-section">
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>RSVP Dashboard</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>RSVP Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="I'm coming!">I'm coming!</option>
                            <option value="I'm there in spirit">I'm there in spirit</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                {message && <p style={{ marginTop: '1rem', textAlign: 'center', color: '#333' }}>{message}</p>}
            </div>
        </div>
    );
};

export default RSVPForm;
