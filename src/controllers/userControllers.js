const db = require("../../database");

const getUsers = (req, res) => {
  db.query("SELECT * FROM `users`", (err, results) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    res.json(results);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM `users` WHERE `id` = ?", [id], (err, results) => {
    const user = results.find((user) => user.id === id);
    if (user != null) {
      res.status(200).json(user);
    } else {
      res.status(404).send("Not Found");
    }
  });
};

const postUser = (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, city, language } = req.body;
  db.query(
    "INSERT INTO `users` (`firstname`, `lastname`, `email`, `city`, `language`) VALUES (?, ?, ?, ?, ?)",
    [firstname, lastname, email, city, language],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(201).send({ id: results.insertId });
      }
    }
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;
  db.query(
    "UPDATE `users` SET `firstname` = ?, `lastname` = ?, `email` = ?, `city` = ?, `language` = ? WHERE `id` = ?",
    [firstname, lastname, email, city, language, id],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).send("User updated successfully");
      }
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  db.query("DELETE FROM `users` WHERE `id` = ?", [id], (err, results) => {
    if (err) {
      res.status(422).send(err);
    } else {
      res.status(200).send("User deleted successfully");
    }
  });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
};
