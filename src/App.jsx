// src/App.jsx
import React, { useState, useEffect } from 'react';
import RatingList from './components/RatingList';
import RatingForm from './components/RatingForm';
import './style.css';

const App = () => {
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    try {
      const response = await fetch('http://localhost:8080/ratings');
      const data = await response.json();
      setRatings(data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div className="app-container">
      <h1 className="main-header">Rating Management</h1>
      <RatingForm onRatingAdded={fetchRatings} />
      <RatingList ratings={ratings} onRatingUpdated={fetchRatings} />
    </div>
  );
};

export default App;
