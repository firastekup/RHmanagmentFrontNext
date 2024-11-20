import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Next.js Link for routing
import styles from '../styles/adminDashboard.module.css';

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState([]); // État pour la liste des congés
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

  // Simulation de la récupération des congés
  useEffect(() => {
    const fetchedLeaves = [
      { id: 1, employee: 'John Doe', startDate: '2024-11-10', endDate: '2024-11-12', status: 'Approved' },
      { id: 2, employee: 'Jane Smith', startDate: '2024-11-15', endDate: '2024-11-18', status: 'Pending' },
      { id: 3, employee: 'Michael Brown', startDate: '2024-11-20', endDate: '2024-11-25', status: 'Rejected' }
    ];
    setLeaves(fetchedLeaves);
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>Admin</h2>
        <ul className={styles.sidebarLinks}>
          <li><Link href="/admin/dashboard">Dashboard</Link></li>
          <li><Link href="/leaves">Leaves List</Link></li>
          <li><Link href="/admin/settings">Settings</Link></li>
          <li><Link href="/admin/reports">Reports</Link></li>
          <li><Link href="/logout">Logout</Link></li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Welcome, {userName} (Admin)</h1>
          <p>This is the Admin Dashboard.</p>
        </div>

        <div className={styles.content}>
          <h2>Leaves List</h2>
          <p>Manage and review the leaves requested by employees below:</p>
          
          {/* Tableau des congés */}
          <table className={styles.leavesTable}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.employee}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
