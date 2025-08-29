import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Tab, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Importa o ícone de logout
import SocialFeed from '../components/SocialFeed';
import FavoritedPosts from '../components/FavoritedPosts';
import Profile from '../components/Profile'; // Importar o novo componente Profile
import './Dashboard.css';

const Dashboard = () => {
  const [key, setKey] = useState('home');
  const [currentUserId, setCurrentUserId] = useState(null); // Estado para armazenar o userId
  const [currentUserName, setCurrentUserName] = useState(null); // Estado para armazenar o userName
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar userId e userName do localStorage ao montar o componente
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
    localStorage.removeItem('userId'); // Remover userId do localStorage
    localStorage.removeItem('userName'); // Remover userName do localStorage
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
          <Nav.Link eventKey="social-feed">Rede Social</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profile">Perfil</Nav.Link> {/* Novo item de navegação para o perfil */}
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="home" active={key === 'home'}>
          <p>Conteúdo da Home. Aqui você verá seus principais resumos e agenda.</p>
          <FavoritedPosts userId={currentUserId} />
        </Tab.Pane>
        <Tab.Pane eventKey="social-feed" active={key === 'social-feed'}>
          <SocialFeed userId={currentUserId} />
        </Tab.Pane>
        <Tab.Pane eventKey="profile" active={key === 'profile'}> {/* Novo Tab.Pane para o perfil */}
          <Profile userId={currentUserId} userName={currentUserName} />
        </Tab.Pane>
      </Tab.Content>
    </Container>
  );
}

export default Dashboard;
