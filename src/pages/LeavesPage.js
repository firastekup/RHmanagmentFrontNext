import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LeavesPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Ajout d'un état pour vérifier si l'utilisateur est authentifié

  useEffect(() => {
    const token = localStorage.getItem('token');
    const employeeId = localStorage.getItem('employeeId');

    if (!token || !employeeId) {
      router.push('/login');
    } else {
      setIsAuthenticated(true); // L'utilisateur est authentifié
      axios
        .get(`http://localhost:4000/leaves/notifications/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLeaves(response.data);
        })
        .catch(() => {
          setError('Erreur lors de la récupération des congés');
        });
    }
  }, [router]);

  if (!isAuthenticated) return null; // Ne rien afficher avant que l'utilisateur soit authentifié

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
