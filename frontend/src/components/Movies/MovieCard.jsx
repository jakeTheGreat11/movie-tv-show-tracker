import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
      <main class="wrapper">
        <article class="card">
            <img src="https://picsum.photos/200" alt="John Wick 3" />
            <h3>John Wick</h3>
        </article>
    </main>
  )
}

export default MovieCard
