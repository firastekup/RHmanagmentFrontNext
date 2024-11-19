import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles/LoginPage.module.css'; // Importation du fichier CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });

      // Stocker le token, le nom de l'utilisateur, et l'ID dans localStorage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userName', response.data.user.name);
      localStorage.setItem('employeeId', response.data.user.id);  // Stocker l'ID de l'employé

      // Redirection en fonction du rôle de l'utilisateur
      if (response.data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    } catch (error) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Connexion</h1>
        <form onSubmit={handleLogin} className={styles.form}>
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
            <label htmlFor="password" className={styles.label}>Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton}>Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
