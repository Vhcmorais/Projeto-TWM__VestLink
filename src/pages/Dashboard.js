import { Container, Nav, Tab } from "react-bootstrap";
import { useState } from "react";
import SocialFeed from "../components/SocialFeed";
import FavoritedPosts from "../components/FavoritedPosts";
import "./Dashboard.css"; // Importar o CSS do Dashboard

function Dashboard() {
  const [key, setKey] = useState('home');
  const userId = 1; // Placeholder: Substituir com o ID do usuário autenticado

  return (
    <Container fluid className="p-4 dashboard-container">
      <div className="dashboard-header">
        <h1>VestLink! 🎓</h1>
        <p>Os estudos na palma da sua mão!</p>
      </div>

      <Nav variant="tabs" defaultActiveKey="home" onSelect={(k) => setKey(k)} className="mb-4">
        <Nav.Item>
          <Nav.Link eventKey="home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="social-feed">Rede Social</Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="home" active={key === 'home'}>
          <p>Conteúdo da Home. Aqui você verá seus principais resumos e agenda.</p>
          <FavoritedPosts userId={userId} />
        </Tab.Pane>
        <Tab.Pane eventKey="social-feed" active={key === 'social-feed'}>
          <SocialFeed />
        </Tab.Pane>
      </Tab.Content>
    </Container>
  );
}

export default Dashboard;
