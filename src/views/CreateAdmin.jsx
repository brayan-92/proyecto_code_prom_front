import React, { useState } from 'react';

const CrearAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAdmin = async () => {
    try {
      const response = await fetch('https://proyecto-code-prom-back.vercel.app/api/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: 'admin', // Puedes cambiar el rol según tus necesidades
        }),
      });

      if (response.ok) {
        alert('Registro exitoso');
      } else if (response.status === 400) {
        const data = await response.json(); // Asegúrate de obtener el mensaje del servidor
        if (data.status === 'CorreoExistente') {
          alert(data.message); // "El correo ya está registrado."
        } else {
          alert('Error en el registro');
        }
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el registro');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}> Crear Administrador</h2>
        
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa el email"
            style={styles.input}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la contraseña"
            style={styles.input}
          />
        </div>
        
        <button 
          onClick={handleCreateAdmin}
          style={styles.button}
        >
          Crear Admin
        </button>
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
    width: '112.5%', // Aumentado en un 50%
    maxWidth: '600px', // Ajuste para no exceder el ancho en pantallas grandes
  },
  title: {
    color: '#ffa500',
    textShadow: '2px 2px 10px #ff4500, 0 0 15px #ffa500',
    fontSize: '2em',
    marginBottom: '1em',
  },
  inputGroup: {
    marginBottom: '10px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#ff6347',
  },
  input: {
    width: '70%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '2px solid #ff4500',
    backgroundColor: '#333333',
    color: '#f5f5f5',
    outline: 'none',
    boxShadow: '0 0 10px #ff6347',
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
    marginTop: '10px',
  },
};

export default CrearAdmin;
