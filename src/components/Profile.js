import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form, Spinner, Alert } from 'react-bootstrap';
import FavoritedPosts from './FavoritedPosts';
import './Profile.css';

const Profile = ({ userId, userName }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);

  const fetchProfile = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/profile`);
      if (!response.ok) {
        throw new Error('Erro ao buscar perfil do usuário.');
      }
      const data = await response.json();
      setProfile(data);
      setNewBio(data.bio || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleBioUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: newBio }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar biografia.');
      }
      fetchProfile(); // Re-fetch profile to update UI
      setIsEditingBio(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProfileImageChange = (e) => {
    setSelectedProfileImage(e.target.files[0]);
  };

  const handleProfilePictureUpload = async () => {
    if (!selectedProfileImage) {
      alert('Por favor, selecione uma imagem para upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', selectedProfileImage);

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/profile/picture`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem de perfil.');
      }
      setSelectedProfileImage(null);
      fetchProfile(); // Re-fetch profile to update UI with new picture
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Container className="profile-container d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!profile) {
    return <Alert variant="info">Nenhum perfil encontrado.</Alert>;
  }

  return (
    <Container className="profile-container mt-4">
      <Row>
        <Col md={4} className="text-center">
          <div className="profile-picture-container">
            <Image 
              src={profile.profilePicturePath ? `http://localhost:3001${profile.profilePicturePath}` : 'https://via.placeholder.com/150'}
              roundedCircle
              className="profile-picture mb-3"
              alt="Foto de Perfil"
            />
            <Form.Group controlId="profilePictureUpload" className="mb-3">
              <Form.Label>Alterar Foto de Perfil</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleProfileImageChange} />
            </Form.Group>
            <Button 
              variant="primary"
              onClick={handleProfilePictureUpload}
              disabled={!selectedProfileImage}
              className="mb-4"
            >
              Upload Foto
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <h2 className="profile-name">{profile.nome}</h2>
          <p className="profile-email">{profile.email}</p>

          <h4 className="mt-4">Biografia</h4>
          {isEditingBio ? (
            <div>
              <Form.Control 
                as="textarea" 
                rows={5} 
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="mb-2"
              />
              <Button variant="success" onClick={handleBioUpdate} className="me-2">Salvar</Button>
              <Button variant="secondary" onClick={() => setIsEditingBio(false)}>Cancelar</Button>
            </div>
          ) : (
            <div>
              <p className="profile-bio-text">{profile.bio || 'Nenhuma biografia disponível. Clique em editar para adicionar uma.'}</p>
              <Button variant="outline-secondary" onClick={() => setIsEditingBio(true)}>Editar Biografia</Button>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <FavoritedPosts userId={userId} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
