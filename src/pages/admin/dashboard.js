import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Ajouter axios pour les requêtes HTTP
import { Line } from 'react-chartjs-2'; // Importation du composant Line de react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // Importation des éléments nécessaires pour Chart.js
import styles from '../styles/adminDashboard.module.css'; // Import CSS Module

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState([]); // Liste des congés
  const [leaveCount, setLeaveCount] = useState(0); // Compteur des congés
  const [userCount, setUserCount] = useState(0); // Compteur des utilisateurs
  const [leaveDates, setLeaveDates] = useState([]); // Dates des congés pour l'axe X du graphique
  const [leaveCounts, setLeaveCounts] = useState([]); // Nombre de congés par date pour l'axe Y du graphique
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (!token || !userName) {
      router.push('/login');
    } else {
      setUserName(userName);
      setLoading(false);
    }
  }, [router]);

  // Fonction pour récupérer les congés
  const fetchLeaves = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:4000/leaves', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(response.data);
      setLeaveCount(response.data.length);

      // Préparer les données pour le graphique
      const dates = response.data.map(leave => leave.date); // Supposons que chaque congé a une date
      const counts = response.data.map(leave => leave.count); // Nombre de congés par date (par exemple, 1 pour chaque demande)

      setLeaveDates(dates);
      setLeaveCounts(counts);
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
      setUserCount(response.data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Effect pour charger les données au début et définir un rafraîchissement périodique
  useEffect(() => {
    fetchLeaves();
    fetchUserCount();

    // Rafraîchir les données toutes les 5 secondes
    const interval = setInterval(() => {
      fetchLeaves(); // Rafraîchir les congés
    }, 5000); // Mettre à jour toutes les 5 secondes

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Configuration du graphique
  const chartData = {
    labels: leaveDates, // L'axe X avec les dates des congés
    datasets: [
      {
        label: 'Number of Leaves',
        data: leaveCounts, // L'axe Y avec le nombre de congés
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>Admin</h2>
        <ul className={styles.sidebarLinks}>
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/leaves">Leaves List</a></li>
          <li><a href="/admin/AddInternship">Add Internship</a></li>
          <li><a href="/admin/interships">List Internships</a></li>
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
            <img src="/images/userlogo.png" alt="Users" className={styles.cardIcon} />
            <h3>Users</h3>
            <p>{userCount}</p>
            <button className={styles.cardButton}>View Details</button>
          </div>

          {/* Card for the number of leaves */}
          <div className={styles.card}>
            <img src="/images/leave.jpg" alt="Leaves" className={styles.cardIcon} />
            <h3>Leaves</h3>
            <p>{leaveCount}</p>
            <button className={styles.cardButton}>View Details</button>
          </div>

          {/* Card for Reports */}
          <div className={styles.card}>
            <img src="/images/report.png" alt="Reports" className={styles.cardIcon} />
            <h3>Reports</h3>
            <p>20 New</p>
            <button className={styles.cardButton}>View Reports</button>
          </div>
        </div>

        {/* Graphique des congés */}
        <div className={styles.chartContainer}>
          <h2>Leave Trends</h2>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
