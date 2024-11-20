import { useState } from 'react';
import axios from 'axios';

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
      console.error('Error adding internship:', error);
      setMessage('Failed to add internship. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <h1>Add Internship</h1>
        <form onSubmit={handleSubmit}>
          {/* Subject */}
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          {/* Start Date */}
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          {/* End Date */}
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />

          {/* Duration */}
          <label htmlFor="duration">Duration (months)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />

          {/* Username */}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Framer */}
          <label htmlFor="framer">Framer</label>
          <input
            type="text"
            id="framer"
            name="framer"
            value={formData.framer}
            onChange={handleChange}
            required
          />

          {/* Supervisor */}
          <label htmlFor="supervisor">Supervisor</label>
          <input
            type="text"
            id="supervisor"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            required
          />

          {/* Status */}
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          {/* Submit Button */}
          <button type="submit">Add Internship</button>
        </form>

        {/* Message */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddInternship;
