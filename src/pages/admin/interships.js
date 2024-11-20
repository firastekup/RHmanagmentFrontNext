import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/InternshipList.module.css';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/internships/${id}`);
      setInternships(internships.filter((internship) => internship.id !== id));
      setFilteredInternships(filteredInternships.filter((internship) => internship.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du stage:', error);
    }
  };

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
        <table className={styles.table}>
          <thead>
            <tr>
              <th>email</th>
              <th>subject</th>
              <th>name</th>
              <th>start date</th>
              <th>Date de fin</th>
              <th>Durée (mois)</th>
              <th>Encadrant</th>
              <th>Superviseur</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInternships.map((internship) => (
              <tr key={internship.id}>
                <td>{internship.email}</td>
                <td>{internship.subject}</td>
                <td>{internship.username}</td>
                <td>{internship.startDate}</td>
                <td>{internship.endDate}</td>
                <td>{internship.duration}</td>
                <td>{internship.framer}</td>
                <td>{internship.supervisor}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      internship.status === 'Validé'
                        ? styles.statusValid
                        : styles.statusPending
                    }`}
                  >
                    {internship.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(internship.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noInternships}>Aucun stage disponible.</p>
      )}
    </div>
  );
};

export default Internships;
