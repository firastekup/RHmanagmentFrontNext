import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LeavesPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Vérification du token et de l'identifiant de l'employé dans le localStorage
    const token = localStorage.getItem('token');
    const employeeId = localStorage.getItem('employeeId');

    // Si le token ou l'ID de l'employé est manquant, rediriger vers la page de login
    if (!token || !employeeId) {
      router.push('/login');
    } else {
      // Si l'utilisateur est authentifié, récupérer les congés
      axios
        .get(`http://localhost:4000/leaves/notifications/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Réponse API congés :", response.data);  // Ajouter un log pour vérifier la réponse
          setLeaves(response.data);
        })
        .catch((err) => {
          console.error('Erreur lors de la récupération des congés :', err); // Affichage de l'erreur
          setError('Erreur lors de la récupération des congés');
        });
    }
  }, [router]); // Dépendances sur le router pour la redirection

  return (
    <div>
      <h1>Liste de vos congés</h1>
      {error && <p>{error}</p>}
      {leaves.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom de l'employé</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.nomEmploye}</td>
                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun congé trouvé.</p>
      )}
    </div>
  );
};

export default LeavesPage;
