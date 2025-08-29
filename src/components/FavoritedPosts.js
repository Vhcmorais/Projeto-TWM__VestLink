import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import './FavoritedPosts.css'; // Importar o CSS de FavoritedPosts

const FavoritedPosts = ({ userId }) => {
  const [favoritedPosts, setFavoritedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchFavoritedPosts();
    }
  }, [userId]);

  const fetchFavoritedPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/favorites`);
      if (!response.ok) {
        throw new Error('Erro ao buscar posts favoritados.');
      }
      const data = await response.json();
      setFavoritedPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="favorited-posts-container">
      <h3>Seus Materiais Favoritos</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}
      {!loading && favoritedPosts.length === 0 && <p>Você ainda não favoritou nenhum material.</p>}
      {!loading && favoritedPosts.map((post) => (
        <Card key={post.id} className="mb-3 favorited-post-card">
          {post.coverImagePath && (
            <Card.Img variant="top" src={`http://localhost:3001${post.coverImagePath}`} alt="Cover" className="post-cover-image" />
          )}
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Por: {post.userName || 'Desconhecido'} em {new Date(post.createdAt).toLocaleDateString()}
            </Card.Subtitle>
            {post.description && <Card.Text>{post.description}</Card.Text>}
            <Button variant="info" href={`http://localhost:3001${post.filePath}`} target="_blank" rel="noopener noreferrer">
              Ver Material
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FavoritedPosts;
