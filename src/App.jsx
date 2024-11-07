import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import CreateAdmin from './views/CreateAdmin.jsx';
import UserView from './views/UserView.jsx';
import AdminView from './views/AdminView.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-admin" element={<CreateAdmin />} />
        <Route path="/user" element={<UserView />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;


