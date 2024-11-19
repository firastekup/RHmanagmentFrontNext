import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/requestLeave.module.css'; // Import the CSS module

const RequestLeavePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (!token || !userName) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/leaves',
        {
          employeeId: 1,
          startDate,
          endDate,
          nomEmploye: userName,
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
    <div className={styles.container}>
      <h1 className={styles.header}>Request Leave</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <button type="submit" className={styles.submitButton}>Submit Request</button>
      </form>
    </div>
  );
};

export default RequestLeavePage;
