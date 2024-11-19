import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DashboardPage = () => {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Si aucun token n'est trouvé, rediriger vers la page de login
      router.push('/login');
    }

    // Récupérer le nom de l'utilisateur depuis le localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {userName && <p>Hello, {userName}!</p>}
    </div>
  );
};

export default DashboardPage;
