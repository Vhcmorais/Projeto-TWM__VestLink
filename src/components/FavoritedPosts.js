/* FAVORITED POSTS FUNCTIONS */

/* Importing the necessaries libraries */ 
import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './FavoritedPosts.css';

  /* DEFINING FUNCTIONS TO FAVORITE THE MATERIALS */

  /* Hooks (useState)*/
  const FavoritedPosts = ({ userId }) => {
  const [favoritedPosts, setFavoritedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Hooks (useEffect) */
  useEffect(() => {
    if (userId) {
      fetchFavoritedPosts();
    }
  }, [userId]);

  /* Adding the material to the user favorites */
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

  /* Adding conditions to favorite the materials (the user need to be logged or error to favorite) */
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
      fetchFavoritedPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  /* Conditions to rate the material (the user needs to be logged or error to rate) */
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
      fetchFavoritedPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  /* Definitions to the favorited contents container */
  return (
    <div className="favorited-posts-container">

      {/* Text - title of the container */}
      <h3>Seus Materiais Favoritos</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}

      {/* Text - if the user haven't favorited posts*/}
      {!loading && favoritedPosts.length === 0 && <p>Você ainda não favoritou nenhum material.</p>}

      {/* Definitions - if the user favorites a material */}
      {!loading && favoritedPosts.map((post) => (
        <Card key={post.id} className="mb-3 favorited-post-card">
          {post.coverImagePath && (
            <Card.Img variant="top" src={`http://localhost:3001${post.coverImagePath}`} alt="Cover" className="post-cover-image" />
          )}

          <Card.Body>
            {/* Defining items of the post card inside favoritedposts tab */}
            <Card.Title>{post.title}</Card.Title>
            {post.description && <Card.Text className="card-description">{post.description}</Card.Text>}
            <p className="post-author">Por: {post.userName}</p>

            {/* Defining 'ver material' button */}
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" href={`http://localhost:3001${post.filePath}`} target="_blank" rel="noopener noreferrer" className="w-100 card-view-material-btn">
                Ver Material
              </Button>
            </div>

            {/* Defining 'favoritar' button */}
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
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FavoritedPosts;