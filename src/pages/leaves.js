// pages/leaves.js
import { useEffect, useState } from 'react';

const LeavesPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer les données des congés
    const fetchLeaves = async () => {
      try {
        const response = await fetch('http://localhost:4000/leaves', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLeaves(data);
        } else {
          console.error('Failed to fetch leaves');
        }
      } catch (error) {
        console.error('Error fetching leaves:', error);
      } finally {
        setLoading(false);  // Mettre à jour l'état de chargement
      }
    };

    fetchLeaves();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Leave Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employeeName}</td>
              <td>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === 'pending' && (
                  <>
                    <button>Approve</button>
                    <button>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesPage;
