import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles/RegisterPage.module.css'; // Importing the CSS file

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize router

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/auth/register', {
        name,
        email,
        password,
        role,
      });
      alert('Registration successful');
      router.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError('Error occurred during registration');
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Register Form Container */}
      <div className={styles.registerBox}>
        <h1 className={styles.title}>Register</h1>
        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.input}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
