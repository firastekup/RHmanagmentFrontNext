import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AddInternship.module.css'; // Correct import for CSS modules

const AddInternship = () => {
  const [formData, setFormData] = useState({
    subject: '',
    startDate: '',
    endDate: '',
    duration: '',
    username: '',
    email: '',
    framer: '',
    supervisor: '',
    status: 'pending',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/internships', formData);
      if (response.status === 201) {
        setMessage('Internship added successfully!');
        setIsError(false);
        setFormData({
          subject: '',
          startDate: '',
          endDate: '',
          duration: '',
          username: '',
          email: '',
          framer: '',
          supervisor: '',
          status: 'pending',
        });
      }
    } catch (error) {
      setMessage('Failed to add internship. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Internship</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="startDate" className={styles.label}>Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endDate" className={styles.label}>End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="duration" className={styles.label}>Duration (months)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="framer" className={styles.label}>Framer</label>
          <input
            type="text"
            id="framer"
            name="framer"
            value={formData.framer}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="supervisor" className={styles.label}>Supervisor</label>
          <input
            type="text"
            id="supervisor"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Add Internship</button>
      </form>

      {message && (
        <p className={`${styles.message} ${isError ? styles.error : styles.success}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddInternship;