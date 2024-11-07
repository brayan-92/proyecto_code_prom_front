import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch('https://proyecto-code-prom-front.vercel.app/api/login', {
=======
      const response = await fetch('https://proyecto-code-prom-back.vercel.app/?vercelToolbarCode=FhRxZ4bqmAFIU6f', {
>>>>>>> b45cc218a6ab806660cba15dd56c26e5d0dc733d
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.status === "Bienvenido") {
        //guardar el user_id en localStorage
        localStorage.setItem('user_id', data.user_id);
        navigate(data.role === "admin" ? "/admin" : "/user");
      } else {
        alert("Credenciales incorrectas, por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Hubo un problema con el inicio de sesión, por favor intenta más tarde.");
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>🎃 Bienvenido al Inframundo 🎃</h1>

        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
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

        <div style={styles.buttonGroup}>
          <button onClick={handleLogin} style={styles.button}>Ingresar</button>
          <button onClick={handleRegister} style={styles.button}>Registrarse</button>
        </div>
      </div>
    </div>
  );
}

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

export default Login;
