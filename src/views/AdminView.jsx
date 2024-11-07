import React, { useEffect,useState, } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminView = () => {
  const [winners, setWinners] = useState([]);
  const navigate = useNavigate();

  // Ejemplo de datos (puedes reemplazar esto con tu lógica para obtener los ganadores)
  const fetchWinners = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/canjeados'); // Asegúrate de que la URL sea correcta
      const data = await response.json();
      if (response.ok) {
        setWinners(data.winners); // Asumiendo que el servidor retorna una lista de ganadores
      } else {
        alert('Error al cargar los ganadores');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los ganadores');
    }
  };

  // Llamar a la función para obtener ganadores cuando el componente se monta
  useEffect(() => {
    fetchWinners();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>🎉 GANADORES 🎉</h1>

        <table border="1" style={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>telefono</th>
              <th>Código</th>
              <th>Premio</th>
            </tr>
          </thead>
          <tbody>
            {winners.length === 0 ? (
              <tr>
                <td colSpan="6">No hay ganadores registrados</td>
              </tr>
            ) : (
              winners.map((winner, index) => (
                <tr key={index}>
                  <td>{winner.fecha}</td>
                  <td>{winner.nombre}</td>
                  <td>{winner.cedula}</td>
                  <td>{winner.telefono}</td>
                  <td>{winner.codigo}</td>
                  <td>{winner.premio}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button onClick={handleLogout} style={styles.logoutButton}>Salir</button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    margin: 0,
    backgroundColor: '#1c1c1c',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
    color: '#f5f5f5',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 0 15px #000000',
    width: '80%', // Ampliado en un 50%
    maxWidth: '800px', // Se puede ajustar según sea necesario
  },
  title: {
    color: '#ffa500',
    textShadow: '2px 2px 10px #ff4500, 0 0 15px #ffa500',
    fontSize: '2.5em',
    marginBottom: '1em',
  },
  table: {
    width: '100%',
    textAlign: 'left',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#1c1c1c',
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: '1em',
    color: '#f5f5f5',
    backgroundColor: '#ff4500',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    textShadow: '1px 1px 5px #000',
    boxShadow: '0 0 10px #ffa500',
    marginTop: '20px', // Espaciado de la tabla
  },
};

export default AdminView;

