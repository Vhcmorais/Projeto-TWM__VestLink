/* PROFILE - FUNCTIONS */

/* Importing necessaries libraries */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form, Spinner, Alert } from 'react-bootstrap';
import FavoritedPosts from './FavoritedPosts';
import './Profile.css';

/* Defining functions */

/* Hooks (useState)*/
const Profile = ({ userId, userName }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);

  /* Defining the login success or login error */
  const fetchProfile = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/profile`);
      if (!response.ok) {
        throw new Error('Erro ao buscar perfil do usuário.');
      }

  /* Defining the profile informations */ 
      const data = await response.json();
      setProfile(data);
      setNewBio(data.bio || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* Sync the user profile to userID */
  useEffect(() => {
    fetchProfile();
  }, [userId]);

  /* Defining the update bio function */
  const handleBioUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: newBio }),
      });

  /* Error updating message */

      if (!response.ok) {
        throw new Error('Erro ao atualizar biografia.');
      }
      fetchProfile();
      setIsEditingBio(false);
        } catch (err) {
      setError(err.message);
    }
  };

  /* Defining the function of seting profile image */
  const handleProfileImageChange = (e) => {
    setSelectedProfileImage(e.target.files[0]);
  };

  /* When the user clicks on the upload button */
  const handleProfilePictureUpload = async () => {
    if (!selectedProfileImage) {
      alert('Por favor, selecione uma imagem para upload.');
      return;
    }
  
  /* Create new data form with the user's profile picture selected */
    const formData = new FormData();
    formData.append('profilePicture', selectedProfileImage);

  /* Post the profile picture to the user's informations inside DB */
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/profile/picture`, {
        method: 'POST',
        body: formData,
      });
  
  /* If the user receives error to upload the image */
      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem de perfil.');
      }
      setSelectedProfileImage(null);
      fetchProfile();
        } catch (err) {
      setError(err.message);
    }
  };

  /* If the picture is loading */
  if (loading) {
    return (
      <Container className="profile-container d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  /* If the picture upload received error */
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  /* If the profile wasn't find */
  if (!profile) {
    return <Alert variant="info">Nenhum perfil encontrado.</Alert>;
  }

  /* Functions of the buttons */
  return (
    <Container className="profile-container mt-4">
      <Row>
        <Col md={4} className="text-center">
          <div className="profile-picture-container">
  
  { /* Defining the function to select picture of the user's personal archives */ }
            <Image 
              src={profile.profilePicturePath ? `http://localhost:3001${profile.profilePicturePath}` : 'https://via.placeholder.com/150'}
              roundedCircle
              className="profile-picture mb-3"
              alt="Foto de Perfil"
            />
  { /* Text below the picture that indicates the user can change the picture */}
            <Form.Group controlId="profilePictureUpload" className="mb-3">
              <Form.Label>Alterar Foto de Perfil</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleProfileImageChange} />
            </Form.Group>

  { /* Inputing button 'upload' picture */ }
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

  { /* Inputing the user's name and email inside the profile tab */ }
          <h2 className="profile-name">{profile.nome}</h2>
          <p className="profile-email">{profile.email}</p>

  { /* Inputing the user's biography edits */ }
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
  { /* Inputing 'save' and 'cancel' buttons inside the bio edit */ }
              <Button variant="success" onClick={handleBioUpdate} className="me-2">Salvar</Button>
              <Button variant="secondary" onClick={() => setIsEditingBio(false)}>Cancelar</Button>
            </div>
          ) : (
            <div>
              {/* If the biography is empty */}
              <p className="profile-bio-text">{profile.bio || 'Nenhuma biografia disponível. Clique em editar para adicionar uma.'}</p>
              {/* Inputing 'edit bio' button */}
              <Button variant="outline-secondary" onClick={() => setIsEditingBio(true)}>Editar Biografia</Button>
            </div>
          )}
        </Col>
      </Row>

      {/* Add the favorited materials into the user's profile */}
      <Row className="mt-5">
        <Col>
          <FavoritedPosts userId={userId} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;