import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Vérifier si un token est présent dans le localStorage
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    
    // Si aucun token ou nom d'utilisateur n'est trouvé, rediriger vers la page de login
    if (!token || !userName) {
      router.push('/login');
    } else {
      setUserName(userName); // Récupérer le nom de l'utilisateur
      setLoading(false); // Fin de chargement
    }
  }, [router]);

  // Si le tableau de bord est en train de charger, afficher un message de chargement
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userName} (Admin)</h1>
      <p>This is the Admin Dashboard.</p>
      {/* Ajoutez ici d'autres éléments spécifiques au dashboard de l'admin */}
    </div>
  );
};

export default AdminDashboard;
