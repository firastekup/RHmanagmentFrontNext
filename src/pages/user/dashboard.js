// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/dashboard.module.css';  // Importation du fichier CSS

const DashboardPage = () => {
  const [userName, setUserName] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }

    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    axios.get('http://localhost:4000/leaves')
      .then((response) => {
        const userLeaves = response.data.filter((leave) => leave.nomEmploye === storedUserName);
        setLeaves(userLeaves);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des congés');
      });
  }, [router]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Tableau de bord</h1>
        {userName && <p>Bienvenue, {userName}!</p>}
        <Link href="/user/request-leave" className={styles.leaveRequestLink}>Demander un congé</Link>
      </div>
      
      <h2>Mes congés</h2>
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nom de l'employé</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.nomEmploye}</td>
                  <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td>{leave.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Aucun congé trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
