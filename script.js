document.addEventListener('DOMContentLoaded', () => {
    const moviesTableBody = document.getElementById('moviesTableBody');
    const addMovieForm = document.getElementById('addMovieForm');
    const formTitle = document.querySelector('#add h2');
    const updateMovieButton = document.getElementById('updateMovieButton');
    let selectedMovieId = null;

    fetchMovies();

    addMovieForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const movie = {
            title: document.getElementById('title').value,
            director: document.getElementById('director').value,
            genre: document.getElementById('genre').value,
            release_year: document.getElementById('release_year').value,
            duration_minutes: document.getElementById('duration_minutes').value,
            rating: document.getElementById('rating').value,
            poster_image: document.getElementById('poster_image').value,
            box_office_total: document.getElementById('box_office_total').value
        };

        if (selectedMovieId) {
            await updateMovie(selectedMovieId, movie);
            selectedMovieId = null;
            updateMovieButton.style.display = 'none';
            formTitle.textContent = 'Add a Movie';
        } else {
            await createMovie(movie);
        }

        addMovieForm.reset();
        fetchMovies();
    });

    async function fetchMovies() {
        try {
            const response = await fetch('http://localhost:3000/api/movies');
            if (!response.ok) throw new Error('Network response was not ok');
            const movies = await response.json();

            moviesTableBody.innerHTML = '';
            movies.forEach(movie => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${movie.title}</td>
                    <td>${movie.director}</td>
                    <td>${movie.genre}</td>
                    <td>${movie.release_year}</td>
                    <td>${movie.duration_minutes}</td>
                    <td>${movie.rating}</td>
                    <td>${movie.box_office_total}</td>
                    <td><img src="${movie.poster_image}" alt="Poster" style="width:50px;"></td>
                    <td>
                        <button onclick="populateForm(${movie.id})">Update</button>
                        <button onclick="deleteMovie(${movie.id})">Delete</button>
                    </td>
                `;
                moviesTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    async function createMovie(movie) {
        try {
            const response = await fetch('http://localhost:3000/api/movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie)
            });
            if (!response.ok) throw new Error('Network response was not ok');
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    }

    async function updateMovie(id, movie) {
        try {
            const response = await fetch(`http://localhost:3000/api/movies/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie)
            });
            if (!response.ok) throw new Error('Network response was not ok');
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    }

    async function deleteMovie(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/movies/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchMovies();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    }

    window.populateForm = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/movies/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const movie = await response.json();

            document.getElementById('title').value = movie.title;
            document.getElementById('director').value = movie.director;
            document.getElementById('genre').value = movie.genre;
            document.getElementById('release_year').value = movie.release_year;
            document.getElementById('duration_minutes').value = movie.duration_minutes;
            document.getElementById('rating').value = movie.rating;
            document.getElementById('poster_image').value = movie.poster_image;
            document.getElementById('box_office_total').value = movie.box_office_total;

            selectedMovieId = id;
            formTitle.textContent = 'Update Movie';
            updateMovieButton.style.display = 'inline';
        } catch (error) {
            console.error('Error populating form:', error);
        }
    };

    window.deleteMovie = (id) => {
        deleteMovie(id);
    };
});

