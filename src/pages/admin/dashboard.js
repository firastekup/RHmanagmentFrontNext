import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/adminDashboard.module.css'; // Import CSS Module

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token and userName in localStorage
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    
    // If no token or userName found, redirect to login page
    if (!token || !userName) {
      router.push('/login');
    } else {
      setUserName(userName); // Set the userName
      setLoading(false); // Finish loading
    }
  }, [router]);

  const handleLogout = () => {
    // Remove token and userName from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    // Redirect to login page
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
          <li><a href="/leaves">LeavesList</a></li>
          <li><a href="/admin/settings">Settings</a></li>
          <li><a href="/admin/reports">Reports</a></li>
          {/* Logout button */}
          <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Welcome, {userName} (Admin)</h1>
          <p>This is the Admin Dashboard.</p>
        </div>
        <div className={styles.content}>
          <p>Manage users, view reports, and configure settings from the dashboard.</p>
          <button className={styles.button}>Manage Users</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
