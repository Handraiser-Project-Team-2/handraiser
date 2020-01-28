const express = require("express");
const cors = require("cors");
const massive = require("massive");
// setup controllers

const users = require("./controllers/users");
const classes = require("./controllers/class");

massive({
  host: "localhost",
  port: 5433,
  database: "handraiser",
  user: "postgres",
  password: "handraiser"
})
  .then(db => {
    const app = express();

    // middlewares
    app.set("db", db);
    app.use(express.json());
    app.use(cors());

    // port declaration
    const PORT = 5001 || process.env.PORT;

    // endpoints declaration
    app.post("/api/login", users.login);

    app.get("/api/classes", classes.getAllClass);
    app.get("/api/classes/students/:class_id", classes.getStudentsByClass);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
