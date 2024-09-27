import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './style/App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/ShowUser';
import EditUser from './components/EditUser';
import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/user/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/edit-user/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
