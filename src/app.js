// Importation des modules et dépendances nécessaires
const express = require("express");
const app = express();
const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

// Middleware pour analyser les corps JSON
app.use(express.json());

// Routes pour les films
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);
app.put("/api/movies/:id", movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

// Routes pour les utilisateurs
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", userControllers.postUser);
app.put("/api/users/:id", userControllers.updateUser);
app.delete("/api/users/:id", userControllers.deleteUser);

module.exports = app;
