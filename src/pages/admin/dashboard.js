import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Ajouter axios pour les requêtes HTTP
import styles from '../styles/adminDashboard.module.css'; // Import CSS Module

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState([]); // Liste des congés
  const [leaveCount, setLeaveCount] = useState(0); // Compteur des congés
  const [userCount, setUserCount] = useState(0); // Compteur des utilisateurs
  const router = useRouter();

  useEffect(() => {
    // Vérifier si un token est présent dans le localStorage
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    
    // Si aucun token ou nom d'utilisateur n'est trouvé, rediriger vers la page de login
    if (!token || !userName) {
      router.push('/login');
    } else {
      setUserName(userName); // Récupérer le nom de l'utilisateur
      setLoading(false); // Fin de chargement
    }
  }, [router]);

  useEffect(() => {
    // Fonction pour récupérer les congés de l'API
    const fetchLeaves = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/leaves', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaves(response.data); // Assurez-vous que l'API renvoie la liste des congés
        setLeaveCount(response.data.length); // Calculer le nombre de congés
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    // Fonction pour récupérer le nombre d'utilisateurs
    const fetchUserCount = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserCount(response.data.length); // Calculer le nombre d'utilisateurs
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchLeaves();
    fetchUserCount();
  }, []); // Cette fonction se déclenche uniquement lors du premier rendu du composant

  const handleLogout = () => {
    // Supprimer le token et le nom d'utilisateur du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    // Rediriger vers la page de login
    router.push('/login');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>Admin</h2>
        <ul className={styles.sidebarLinks}>
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/leaves">Leaves List</a></li>
          <li><a href="/admin/settings">Settings</a></li>
          <li><a href="/admin/reports">Reports</a></li>
          <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Welcome, {userName} (Admin)</h1>
          <p>Overview of key metrics and actions</p>
        </div>

        <div className={styles.cards}>
          {/* Card for the number of users */}
          <div className={styles.card}>
            <h3>Users</h3>
            <p>{userCount}</p> {/* Afficher le nombre d'utilisateurs */}
            <button className={styles.cardButton}>View Details</button>
          </div>

          {/* Card for the number of leaves */}
          <div className={styles.card}>
            <h3>Leaves</h3>
            <p>{leaveCount}</p> {/* Afficher le nombre de congés */}
            <button className={styles.cardButton}>View Details</button>
          </div>

          <div className={styles.card}>
            <h3>Reports</h3>
            <p>20 New</p>
            <button className={styles.cardButton}>View Reports</button>
          </div>
        </div>
      </div>
    
    
    
    </div>
  );
};

export default AdminDashboard;
