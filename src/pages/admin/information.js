import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/informationadmin.module.css';

const InformationPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      // Vérifier si le token existe
      const token = localStorage.getItem('token');
      const employeeId = localStorage.getItem('employeeId');

      if (!token || !employeeId) {
        // Rediriger vers la page de connexion si pas de token
        router.push('/login');
        return;
      }

      try {
        // Requête pour récupérer les informations de l'utilisateur
        const response = await axios.get(`http://localhost:4000/users/${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        setError('Impossible de charger les informations utilisateur');
        setLoading(false);
        
        // Déconnexion en cas d'erreur
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('employeeId');
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('employeeId');
    router.push('/login');
  };

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Chargement des informations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={() => router.push('/login')} className={styles.returnButton}>
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <h1>Profil Utilisateur</h1>
          <button 
            onClick={handleLogout} 
            className={styles.logoutButton}
          >
            Déconnexion
          </button>
        </div>

        <div className={styles.userInfoSection}>
          <div className={styles.infoGroup}>
            <label>Nom</label>
            <p>{userData.name}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Email</label>
            <p>{userData.email}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Rôle</label>
            <p className={styles.roleLabel}>
              {userData.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
            </p>
          </div>

          {userData.internships && (
            <div className={styles.internshipsSection}>
              <h2>Stages</h2>
              {userData.internships.length > 0 ? (
                <table className={styles.internshipsTable}>
                  <thead>
                    <tr>
                      <th>Sujet</th>
                      <th>Début</th>
                      <th>Fin</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.internships.map((internship) => (
                      <tr key={internship.id}>
                        <td>{internship.subject}</td>
                        <td>{new Date(internship.startDate).toLocaleDateString()}</td>
                        <td>{new Date(internship.endDate).toLocaleDateString()}</td>
                        <td>{internship.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun stage en cours</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformationPage;