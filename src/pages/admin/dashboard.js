import styles from '../styles/adminDashboard.module.css'; // Import CSS module
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState([]);
  const [leaveCount, setLeaveCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [leaveDates, setLeaveDates] = useState([]);
  const [leaveCounts, setLeaveCounts] = useState([]);
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

  const fetchLeaves = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:4000/leaves', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(response.data);
      setLeaveCount(response.data.length);

      const dates = response.data.map(leave => leave.date);
      const counts = response.data.map(leave => leave.count);

      setLeaveDates(dates);
      setLeaveCounts(counts);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const fetchUserCount = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:4000/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserCount(response.data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchUserCount();

    const interval = setInterval(() => {
      fetchLeaves();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: leaveDates,
    datasets: [
      {
        label: 'Number of Leaves',
        data: leaveCounts,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>Admin</h2>
        <ul>
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/leaves">Leaves List</a></li>
          <li><a href="/admin/AddInternship">Add Internship</a></li>
          <li><a href="/admin/interships">List Internships</a></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Welcome, {userName} (Admin)</h1>
          <p>Overview of key metrics and actions</p>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <img className={styles.cardIcon} src="/images/userlogo.png" alt="Users" />
            <h3>Users</h3>
            <p>{userCount}</p>
            <button className={styles.cardButton}>View Details</button>
          </div>

          <div className={styles.card}>
            <img className={styles.cardIcon} src="/images/leave.jpg" alt="Leaves" />
            <h3>Leaves</h3>
            <p>{leaveCount}</p>
            <button className={styles.cardButton}>View Details</button>
          </div>

          <div className={styles.card}>
            <img className={styles.cardIcon} src="/images/report.png" alt="Reports" />
            <h3>Reports</h3>
            <p>20 New</p>
            <button className={styles.cardButton}>View Reports</button>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h2>Leave Trends</h2>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
