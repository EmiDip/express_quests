const db = require("../../database");

const getMovies = (req, res) => {
  db.query("SELECT * FROM `movies`", (err, results) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    res.json(results);
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database.query(
    "SELECT * FROM `movies` WHERE `id` = ?",
    [id],
    (err, results) => {
      const movie = results.find((movie) => movie.id === id);
      if (movie != null) {
        res.json(movie);
      } else {
        res.status(404).send("Not Found");
      }
    }
  );
};

const postMovie = async (req, res) => {
  res.send("Post route is working 🎉");
  const { title, director, year, color, duration } = req.body;

  try {
    const [result] = await database.query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    );

    res.status(201).send({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  database.query(
    "UPDATE `movies` SET `title` = ?, `director` = ?, `year` = ?, `color` = ?, `duration` = ? WHERE `id` = ?",
    [title, director, year, color, duration, id],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).send("Movie updated successfully");
      }
    }
  );
};

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);
  database.query(
    "DELETE FROM `movies` WHERE `id` = ?",
    [id],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).send("Movie deleted successfully");
      }
    }
  );
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie,
};
