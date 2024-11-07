import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !birthDate || !idNumber || !email || !phone || !city || !password || !confirmPassword) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      alert('La contraseña no coincide');
    } else {
      try {
        const response = await fetch('http://localhost:3002/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            role: 'user',
            idNumber,
            name,
            cell: phone,
            city,
            birthDate,
          }),
        });
        if (response.ok) {
          alert('Registro exitoso');
          navigate('/login'); // Redirige al login después del registro exitoso
        } else {
          alert('Error en el registro');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro');
      }
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>🎃 Registro de Halloween 🎃</h1>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="birthDate" style={styles.label}>Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="idNumber" style={styles.label}>Cédula:</label>
          <input
            type="text"
            id="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="Ingresa tu cédula"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="phone" style={styles.label}>Teléfono:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingresa tu teléfono"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="city" style={styles.label}>Ciudad:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ingresa tu ciudad"
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
            placeholder="Ingresa tu contraseña"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirma tu contraseña"
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button onClick={handleRegister} style={styles.button}>Registrarse</button>
        </div>
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
  },
  title: {
    color: '#ffa500',
    textShadow: '2px 2px 10px #ff4500, 0 0 15px #ffa500',
    fontSize: '2.5em',
    marginBottom: '1em',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1em',
    width: '80%',
    maxWidth: '400px',
  },
  label: {
    fontSize: '1.2em',
    marginBottom: '0.5em',
    color: '#ff6347',
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
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '400px',
    marginTop: '1em',
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
  },
};

export default Register;
