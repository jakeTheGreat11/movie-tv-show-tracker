import axios from 'axios';

export const getPopularMovies = async (req, res) => {
    try {
        const apiKey = process.env.TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        
        // Fetch data from the TMDb API
        const response = await axios.get(url);
        const movies = response.data.results;

        res.status(200).json({ success: true, movies });
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};