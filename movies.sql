CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(100),
    genre VARCHAR(100),
    release_year INT,
    duration_minutes INT,  
    rating DECIMAL(2, 1),  
    poster_image VARCHAR(255),  
    box_office_total DECIMAL(15, 2)  
);
