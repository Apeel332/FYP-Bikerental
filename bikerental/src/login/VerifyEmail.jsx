import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (token) {
            axios.get(`http://localhost:3001/verify-email?token=${token}`)
                .then(response => {
                    setStatus('Email verified successfully. You can now log in.');
                    setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
                })
                .catch(error => {
                    setStatus('Invalid or expired token');
                });
        } else {
            setStatus('No verification token found.');
        }
    }, [token, navigate]);

    return (
        <div>
            <h3>{status}</h3>
        </div>
    );
}

export default VerifyEmail;
