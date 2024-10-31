// src/components/RatingList.jsx
import React, { useState } from 'react';

const RatingList = ({ ratings, onRatingUpdated }) => {
  const [editRatingId, setEditRatingId] = useState(null); // Store ID of rating being edited
  const [updatedRating, setUpdatedRating] = useState(''); // Store updated rating value
  const [updatedRecipeID, setUpdatedRecipeID] = useState(''); // Store updated recipe ID
  const [updatedUserID, setUpdatedUserID] = useState(''); // Store updated user ID

  // Delete rating function
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/ratings/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onRatingUpdated(); // Refresh ratings after deletion
      } else {
        console.error('Failed to delete rating');
      }
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  // Update rating function
  const handleUpdate = async (id) => {
    if (updatedRating === '' || updatedRecipeID === '' || updatedUserID === '') return;

    try {
      const response = await fetch(`http://localhost:8080/ratings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: parseInt(updatedRating),
          recipeID: updatedRecipeID,
          userID: updatedUserID,
        }),
      });
      if (response.ok) {
        setEditRatingId(null); // Close edit mode
        setUpdatedRating('');
        setUpdatedRecipeID('');
        setUpdatedUserID('');
        onRatingUpdated(); // Refresh ratings after update
      } else {
        console.error('Failed to update rating');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div className="rating-list">
      <h2 className="main-header">Ratings</h2>
      {ratings.length === 0 ? (
        <p>No ratings found.</p>
      ) : (
        ratings.map((rating) => (
          <div className="rating-item" key={rating.ratingID}>
            <p><strong>Recipe ID:</strong> {editRatingId === rating.ratingID ? (
              <input
                type="text"
                value={updatedRecipeID}
                onChange={(e) => setUpdatedRecipeID(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            ) : (
              rating.recipeID
            )}</p>
            <p><strong>User ID:</strong> {editRatingId === rating.ratingID ? (
              <input
                type="text"
                value={updatedUserID}
                onChange={(e) => setUpdatedUserID(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            ) : (
              rating.userID
            )}</p>
            <p>
              <strong>Rating:</strong>
              {editRatingId === rating.ratingID ? (
                <input
                  type="number"
                  value={updatedRating}
                  onChange={(e) => setUpdatedRating(e.target.value)}
                  min="1"
                  max="5"
                  style={{ marginLeft: '10px' }}
                />
              ) : (
                rating.rating
              )}
            </p>
            {editRatingId === rating.ratingID ? (
              <button onClick={() => handleUpdate(rating.ratingID)} style={buttonStyle}>Save</button>
            ) : (
              <button onClick={() => {
                setEditRatingId(rating.ratingID);
                setUpdatedRating(rating.rating); // Set the current rating value to the input
                setUpdatedRecipeID(rating.recipeID); // Set the current recipe ID to the input
                setUpdatedUserID(rating.userID); // Set the current user ID to the input
              }} style={buttonStyle}>Update</button>
            )}
            <button onClick={() => handleDelete(rating.ratingID)} style={deleteButtonStyle}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

// Styles for buttons
const buttonStyle = {
  padding: '5px 10px',
  margin: '5px',
  backgroundColor: '#D6589F',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#A04075',
};

export default RatingList;