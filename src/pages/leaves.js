import { useEffect, useState } from 'react';
import axios from 'axios';

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer tous les congés depuis l'API
    axios.get('http://localhost:4000/leaves')
      .then((response) => {
        setLeaves(response.data);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des congés');
      });
  }, []);

  const deleteLeave = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/leaves/${id}`);
      setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du congé', error);
    }
  };

  const updateLeave = async (id, status) => {
    try {
      await axios.patch(`http://localhost:4000/leaves/${id}`, { status });
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) => (leave.id === id ? { ...leave, status } : leave))
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du congé', error);
    }
  };

  return (
    <div>
      <h1>Liste des congés</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nom de l'employé</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              {/* Afficher le nom de l'employé depuis le champ nomEmploye */}
              <td>{leave.nomEmploye}</td>
              <td>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td>{leave.status}</td>
              <td>
                <button onClick={() => updateLeave(leave.id, 'approved')}>Approuver</button>
                <button onClick={() => updateLeave(leave.id, 'rejected')}>Rejeter</button>
                <button onClick={() => deleteLeave(leave.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaves;
