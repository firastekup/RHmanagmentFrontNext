// pages/user/request-leave.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RequestLeavePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/leaves', // Votre route backend pour créer une demande de congé
        {
          employeeId: 1, // Vous devez remplacer cela par l'ID de l'utilisateur connecté, par exemple depuis un contexte ou le token
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage('Your leave request has been successfully submitted.');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      setError('Failed to submit leave request. Please try again.');
    }
  };

  return (
    <div>
      <h1>Request Leave</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestLeavePage;
