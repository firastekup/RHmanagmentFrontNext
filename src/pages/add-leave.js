// pages/add-leave.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddLeave = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const leaveData = { employeeId, startDate, endDate, status };
      await axios.post('http://localhost:4000/leaves', leaveData);
      setMessage('Congé ajouté avec succès');
      router.push('/leaves');  // Rediriger vers la page des congés
    } catch (error) {
      setMessage('Erreur lors de l\'ajout du congé');
    }
  };

  return (
    <div>
      <h1>Ajouter un congé</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employé ID :</label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <div>
          <label>Date de début :</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>Date de fin :</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddLeave;
