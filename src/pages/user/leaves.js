import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Next.js Link for routing
import styles from '../styles/adminDashboard.module.css';

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
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
          <p>Manage users, view reports, and configure settings from the dashboard.</p>
          <button className={styles.button}>Manage Users</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
