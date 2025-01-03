// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/dashboard.module.css';
import Image from 'next/image';  // Importation du composant Image de Next.js

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        {/* Utilisation du composant Image de Next.js pour afficher le logo */}
        <div className={styles.logoWrapper}>
          <Image 
            src="/images/logo.png"  // Chemin relatif à partir du dossier 'public'
            alt="Logo"
            width={200}  // Largeur de l'image
            height={200} // Hauteur de l'image
            className={styles.logo}
          />
        </div>

        <h2 className={styles.dashboardTitle}>Tableau de bord</h2>

        <ul className={styles.navLinks}>
          <li><Link href="/user/request-leave" className={styles.navLink}>Demander un congé</Link></li>
          <li><Link href="/user/information" className={styles.navLink}>Mon profil</Link></li>
          <li><button onClick={handleLogout} className={styles.logoutButton}>Déconnexion</button></li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.header}>
          {userName && <p className={styles.welcomeMessage}>Bienvenue, {userName}!</p>}
          <h2 className={styles.sectionTitle}>Mes congés</h2>
        </div>

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
    </div>
  );
};

export default DashboardPage;
