import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Tab, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import SocialFeed from '../components/SocialFeed';
import FavoritedPosts from '../components/FavoritedPosts';
import Profile from '../components/Profile';
import './Dashboard.css';

const Dashboard = () => {
  const [key, setKey] = useState('home');
  const [currentUserId, setCurrentUserId] = useState(null); 
  const [currentUserName, setCurrentUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    if (storedUserId) {
      setCurrentUserId(parseInt(storedUserId));
    }
    if (storedUserName) {
      setCurrentUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate("/");
  };

  return (
    <Container fluid className="p-4 dashboard-container position-relative">
      <div className="dashboard-header">
        <h1>VestLink! 🎓</h1>
        <p>Os estudos na palma da sua mão!</p>
        <p className="text-muted">Bem-vindo(a), {currentUserName || 'Usuário'}!</p> {/* Exibir nome do usuário */}
        <Button
          variant="primary"
          onClick={handleLogout}
          className="position-absolute bottom-0 end-0 m-4"
          style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
        >
          Sair da Conta
        </Button>
      </div>

      <Nav variant="tabs" defaultActiveKey="home" onSelect={(k) => setKey(k)} className="mb-4">
        <Nav.Item>
          <Nav.Link eventKey="home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="social-feed">Materiais</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profile">Meu Perfil</Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="home" active={key === 'home'}>
          <p>Conteúdo da sua home. Aqui você verá seus principais resumos e agenda.</p>
          <FavoritedPosts userId={currentUserId} />
        </Tab.Pane>
        <Tab.Pane eventKey="social-feed" active={key === 'social-feed'}>
          <SocialFeed userId={currentUserId} />
        </Tab.Pane>
        <Tab.Pane eventKey="profile" active={key === 'profile'}>
          <Profile userId={currentUserId} userName={currentUserName} />
        </Tab.Pane>
      </Tab.Content>
    </Container>
  );
}

export default Dashboard;
