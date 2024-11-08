import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserView = () => {
  const [code, setCode] = useState('');
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodigo = async () => {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        console.error('user_id no encontrado en localStorage');
        return;
      }

      try {
        const response = await fetch('https://proyecto-code-prom-back.vercel.app/api/obtenerCodigo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }), 
        });

        if (!response.ok) {
          throw new Error('Error al obtener el código');
        }

        const data = await response.json();
        console.log('Código obtenido:', data);

        // Asignar un estado a cada código y combinar las listas
        const canjeados = (data.codigosCanjeados || []).map(c => ({
          ...c,
          estado: "Canjeado",
          fecha: c.fecha_cambio_estado,
        }));
        
        const fallidos = (data.intentos || []).map(f => ({
          ...f,
          estado: "Fallido",
          fecha: f.fecha_intento,
          premio: "sin premio",
        }));

        setCodes([...canjeados, ...fallidos]);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
        
    };

    fetchCodigo();
  }, []);

  const handleRegisterCode = async () => {
    if (code.length === 3 && /^\d+$/.test(code)) {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        alert("No se encontró el user_id. Por favor, inicia sesión de nuevo.");
        navigate('/login');
        return;
      }

      const newCode = {
        date: new Date().toLocaleDateString(),
        code,
      };

      try {
        const response = await fetch('http://localhost:3002/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo: code, user_id }),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.status === "CodigoExistente") {
            alert(data.message);
            setCodes([...codes, { ...newCode, prize: data.premio, status: "Canjeado" }]);
          } else if (data.status === "CodigoNoExistente") {
            alert(data.message);
          }
        } else {
          alert(data.message || 'Error en el registro');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro');
      }

      setCode('');
    } else {
      alert('El código debe ser un número de 3 dígitos.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>👻 Registrar Código 👻</h1>

        <div style={styles.inputGroup}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ingresa un código de 3 números"
            maxLength={3}
            style={styles.input}
          />
          <button onClick={handleRegisterCode} style={styles.button}>Registrar</button>
        </div>

        <p style={styles.subtitle}>🕸️ Códigos registrados 🕸️</p>

        <table border="1" style={styles.table}>
          <thead>
            <tr>
              <th>Fecha de registro</th>
              <th>Código</th>
              <th>Premio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {codes.length === 0 ? (
              <tr>
                <td colSpan="4">No hay códigos registrados</td>
              </tr>
            ) : (
              codes.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.fecha}</td>
                  <td>{entry.codigo}</td>
                  <td>{entry.premio}</td>
                  <td>{entry.estado}</td>
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
    borderRadius: '10px',
    boxShadow: '0 0 15px #000000',
    width: '75%', // Ampliado en un 50% (anteriormente 50%)
    maxWidth: '600px', // Se puede ajustar según sea necesario
  },
  title: {
    color: '#ffa500',
    textShadow: '2px 2px 10px #ff4500, 0 0 15px #ffa500',
    fontSize: '2.5em',
    marginBottom: '1em',
  },
  subtitle: {
    color: '#ff6347',
    fontSize: '1.5em',
    marginBottom: '1em',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1em',
    width: '80%',
    maxWidth: '400px',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '2px solid #ff4500',
    backgroundColor: '#333333',
    color: '#f5f5f5',
    outline: 'none',
    boxShadow: '0 0 10px #ff6347',
    marginBottom: '10px',
  },
  button: {
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
    margin: '5px 0',
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
  table: {
    width: '100%',
    textAlign: 'left',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#1c1c1c',
  },
};

export default UserView;
