// src/components/RatingForm.jsx
import React, { useState } from 'react';

const RatingForm = ({ onRatingAdded }) => {
  const [recipeID, setRecipeID] = useState('');
  const [userID, setUserID] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRating = { recipeID, userID, rating: parseInt(rating) };

    try {
      const response = await fetch('http://localhost:8080/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRating),
      });

      if (response.ok) {
        onRatingAdded();
      } else {
        console.error('Failed to add rating');
      }
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Recipe ID</label>
        <input
          type="text"
          value={recipeID}
          onChange={(e) => setRecipeID(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>User ID</label>
        <input
          type="text"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Rating (1-5)</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
      </div>
      <button type="submit">Add Rating</button>
    </form>
  );
};

export default RatingForm;
