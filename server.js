const express = require("express");
const cors = require("cors");
const massive = require("massive");
// setup controllers

const users = require("./controllers/users");
const admin = require("./controllers/admins");
const classes = require("./controllers/class");
const mentor = require("./controllers/mentor");
const student = require("./controllers/student");

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
    const PORT = 5000 || process.env.PORT;

    // endpoints declaration
    app.post("/api/login", users.login);

    // admins endpoints
    app.post("/api/admin/keygen/mentor", admin.add_mentor);
    app.post("/api/admin/keygen", admin.add_admin_mentor);
    app.get("/api/admin/all_list", admin.accessList);
    app.get("/api/admin/mentor_list", admin.accessList_mentors);
    app.get("/api/admin/admins_list", admin.accessList_admins);
    app.post("/api/admin/verify", admin.verify);

    app.post("/api/admin/check/promotions", admin.need_validations);

    // mentor endpoints
    app.post("/api/mentor/classroom/add", mentor.add_classroom);
    app.get("/api/classes/queue/:class_id", mentor.get_inqueue)

    // student endpoints
    app.post("/api/student/class/register", student.regToClass);
    app.post("/api/student/request/assistance", student.ask_assistance);
    app.get("/api/student/queue/order/:class_id/:user_id", student.queue_order)

    // class endpoints
    app.get("/api/classes", classes.getAllClass);
    app.get("/api/classes/students/:class_id", classes.getStudentsByClass);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
