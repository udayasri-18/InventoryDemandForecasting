const db = require('../models/movieModel');

const getAllMovies = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM movies');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
        if (rows.length === 0)
            return res.status(404).json({ message: 'Movie not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMovie = async (req, res) => {
    const { title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO movies (title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total]
        );
        res.status(201).json({ id: result.insertId, title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMovie = async (req, res) => {
    const { title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE movies SET title = ?, director = ?, genre = ?, release_year = ?, duration_minutes = ?, rating = ?, poster_image = ?, box_office_total = ? WHERE id = ?',
            [title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total, req.params.id]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteMovie = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) 
            return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
