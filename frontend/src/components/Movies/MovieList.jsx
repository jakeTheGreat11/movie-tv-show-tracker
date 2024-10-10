import React, { useEffect } from 'react';
import { useMovieStore } from '../../store/movieStore'; // Import your movie store
import MovieCard from './MovieCard';

const MovieList = () => {
    const { movies, isLoading, error, fetchMovies } = useMovieStore();

    useEffect(() => {
        fetchMovies(); // Fetch movies when the component mounts
    }, [fetchMovies]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
