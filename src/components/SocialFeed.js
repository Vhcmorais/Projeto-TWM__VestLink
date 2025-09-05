/* MATERIALS - FUNCTIONS */

/* Importing necessaries libraries */
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Re-adicionado imports
import './SocialFeed.css';

/* Defining functions to post materials */

/* Hooks (useState) */
const SocialFeed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Hooks (useEffect) */
  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  /* Functions to search for posted material */
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/posts');
      if (!response.ok) {
        throw new Error('Erro ao buscar posts.');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setSelectedCoverImage(e.target.files[0]);
  };

  /* Functions to post some material */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !selectedFile) {
      setError('Título e material de estudo são obrigatórios.');
      return;
    }
    if (!userId) {
      setError('Usuário não autenticado. Faça login novamente.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('material', selectedFile);
      if (selectedCoverImage) {
        formData.append('coverImage', selectedCoverImage);
      }

      const uploadResponse = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Erro ao fazer upload dos arquivos: ${errorText}`);
      }

      const uploadData = await uploadResponse.json();
      const filePath = uploadData.materialPath;
      const coverImagePath = uploadData.coverImagePath || null;

      const postResponse = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, title, description, filePath, coverImagePath }),
      });

      if (!postResponse.ok) {
        const errorText = await postResponse.text();
        throw new Error(`Erro ao criar o post: ${errorText}`);
      }

      setTitle('');
      setDescription('');
      setSelectedFile(null);
      setSelectedCoverImage(null);
      document.getElementById('materialFileInput').value = '';
      if (document.getElementById('coverImageInput')) {
        document.getElementById('coverImageInput').value = '';
      }
      fetchPosts();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* Functions to favorite a posted material */
  const handleFavorite = async (postId) => {
    if (!userId) {
      alert('Você precisa estar logado para favoritar um post.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao favoritar/desfavoritar o post.');
      }

      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  /* Functions to rate a posted material */
  const handleRate = async (postId, type) => {
    if (!userId) {
      alert('Você precisa estar logado para avaliar um post.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, type }),
      });

      if (!response.ok) {
        throw new Error('Erro ao avaliar o post.');
      }

      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!userId) {
      alert('Você precisa estar logado para remover um post.');
      return;
    }
    
    /* Function that allows just the author can delete its post */
    const postToDelete = posts.find(p => p.id === postId);
    if (postToDelete && postToDelete.userId !== userId) {
      alert('Você não tem permissão para remover este post.');
      return;
    }

    if (window.confirm('Tem certeza que deseja remover este post?')) {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro ao remover o post: ${errorText}`);
        }

        fetchPosts();
        alert('Post removido com sucesso!');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  /* Texts to the tab */
  return (
    <div className="social-feed-container">
      <h2>Compartilhe seu conhecimento!</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4 social-feed-card">
        <Card.Body>
          <Card.Title>Criar Novo Post</Card.Title>
          <Form onSubmit={handleSubmit} className="social-feed-form">
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do resumo ou material"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição (Opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Adicione uma breve descrição..."
              />
            </Form.Group>

            <Form.Group controlId="materialFileInput" className="mb-3">
              <Form.Label>Material (.docx, .pdf)</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept=".docx,.pdf"
                required
              />
            </Form.Group>

            <Form.Group controlId="coverImageInput" className="mb-3">
              <Form.Label>Imagem de Capa (Opcional)</Form.Label>
              <Form.Control
                type="file"
                onChange={handleCoverImageChange}
                accept="image/*"
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Postar Material'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Space that presents the most current material posted */} 
      <h3>Posts Recentes</h3>
      {loading && <Spinner animation="border" />}
      {!loading && posts.length === 0 && <p>Nenhum post ainda. Seja o primeiro a compartilhar!</p>}
      {!loading && posts.map((post) => (
        <Card key={post.id} className="mb-3 social-feed-card">
          {post.coverImagePath && (
            <Card.Img variant="top" src={`http://localhost:3001${post.coverImagePath}`} alt="Cover" className="post-cover-image" />
          )}
          <Card.Body>

            <Card.Title>{post.title}</Card.Title>
            {post.description && <Card.Text className="card-description">{post.description}</Card.Text>}
            <p className="post-author">Por: {post.userName}</p> {/* Adicionado o nome do autor */}
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" href={`http://localhost:3001${post.filePath}`} target="_blank" rel="noopener noreferrer" className="w-100 card-view-material-btn">
                Ver material
              </Button>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 post-interaction-buttons">
              <div>
                <Button variant="outline-danger" size="sm" className="me-2" onClick={() => handleFavorite(post.id)}>
                  <FaRegHeart /> Favoritar
                </Button>
                <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleRate(post.id, 1)}>
                  <FaThumbsUp /> {post.positiveRatings || 0}
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleRate(post.id, -1)}>
                  <FaThumbsDown /> {post.negativeRatings || 0}
                </Button>
              </div>
              {post.userId === userId && (
                <div>
                  <Button variant="danger" size="sm" onClick={() => handleDeletePost(post.id)}>
                    Remover Post
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SocialFeed;