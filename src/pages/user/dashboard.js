// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';  // Importation de Link

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

      {/* Lien vers la page de demande de congé */}
      <Link href="/user/request-leave">
        <a>Request Leave</a> {/* Ce lien redirigera l'utilisateur vers la page de demande de congé */}
      </Link>
    </div>
  );
};

export default DashboardPage;
