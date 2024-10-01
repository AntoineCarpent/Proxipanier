import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './style/App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import ShowUser from './components/ShowUser';
import ShowProducer from './components/ShowProducer';
import EditUser from './components/EditUser';
import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';
import AddSalesSheets from './components/AddSalesSheets';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><ShowUser /></ProtectedRoute>} />
        <Route path="/producer/:id" element={<ProtectedRoute><ShowProducer /></ProtectedRoute>} />
        <Route path="/edit-user/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
        <Route path="/add-sale-sheet/:id" element={<ProtectedRoute><AddSalesSheets /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
