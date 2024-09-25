import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import ShowProducer from './components/ShowProducer';
import UserProfile from './components/ShowUser';
import EditUser from './components/EditUser';
import './style/App.css';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
    <Router>
      <Header />
      <div
        className="w-full h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/principale.jpg')` }}
      ></div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/producers/:id" element={<ProtectedRoute><ShowProducer /></ProtectedRoute>} />
        <Route path="/user/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/edit-user/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
