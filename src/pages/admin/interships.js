import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/InternshipList.module.css';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    // Récupérer les stages de l'API
    const fetchInternships = async () => {
      try {
        const response = await axios.get('http://localhost:4000/internships');
        setInternships(response.data);
        setFilteredInternships(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des stages:', error);
      }
    };

    fetchInternships();
  }, []);

  // Fonction pour supprimer un stage
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/internships/${id}`);
      setInternships(internships.filter((internship) => internship.id !== id));
      setFilteredInternships(filteredInternships.filter((internship) => internship.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du stage:', error);
    }
  };

  // Fonction pour filtrer par email
  const handleSearch = (event) => {
    setSearchEmail(event.target.value);
    const filtered = internships.filter((internship) =>
      internship.email.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredInternships(filtered);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liste des stages</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Rechercher par email"
          value={searchEmail}
          onChange={handleSearch}
        />
      </div>

      {filteredInternships.length > 0 ? (
        <div className={styles.cardsContainer}>
          {filteredInternships.map((internship) => (
            <div key={internship.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{internship.subject}</h3>
              <p><strong>Date de début:</strong> {internship.startDate}</p>
              <p><strong>Date de fin:</strong> {internship.endDate}</p>
              <p><strong>Durée:</strong> {internship.duration} mois</p>
              <p><strong>Nom de l'étudiant:</strong> {internship.username}</p>
              <p><strong>Email:</strong> {internship.email}</p>
              <p><strong>Framer:</strong> {internship.framer}</p>
              <p><strong>Superviseur:</strong> {internship.supervisor}</p>
              <p><strong>Statut:</strong> {internship.status}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(internship.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noInternships}>Aucun stage disponible.</p>
      )}

      <p className={styles.noInternships}>
        Pour toute question, contactez-nous à{' '}
        <a href="mailto:info@company.com" className={styles.email}>
          info@company.com
        </a>
        .
      </p>
    </div>
  );
};

export default Internships;
