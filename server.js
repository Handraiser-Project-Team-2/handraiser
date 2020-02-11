const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const massive = require("massive");
const cors = require("cors");
const router = require("./router");
// setup controllers
const users = require("./controllers/users");
const admin = require("./controllers/admins");
const classes = require("./controllers/class");
const mentor = require("./controllers/mentor");
const student = require("./controllers/student");

require("dotenv").config();
massive({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
})
  .then(db => {
    // port declaration
    const PORT = 5000 || process.env.PORT;
    const app = express();

    app.set("db", db);
    app.use(cors());
    app.use(express.json());
    //WEBSOCKET START
    const server = http.Server(app);
    const io = socketIO(server);
    app.use(router);
    // endpoints declaration

    // users endpoints
    app.post("/api/login", users.login);
    app.post("/api/user/data", users.getUser);
    app.get("/api/userprofile/:user_id", users.getUserProfile);
    app.get("/api/user/student_list", users.accessList_student);
    app.post("/api/userprofile/", users.getUserProfileByEmail);

    // admins endpoints
    app.post("/api/admin/keygen/mentor", admin.add_mentor); //reference a mentor user type to an email
    app.post("/api/admin/keygen", admin.add_admin_mentor); //register either mentor or admin user type to an email
    app.get("/api/admin/all_list", admin.accessList); //
    app.get("/api/admin/mentor_list", admin.accessList_mentors);
    app.get("/api/admin/admins_list", admin.accessList_admins);
    app.post("/api/admin/verify", admin.verify);

    app.post("/api/admin/check/designation", admin.need_validations); // implicitly check if email need validations

    // mentor endpoints
    app.post("/api/mentor/classroom/add", mentor.add_classroom); // register a new classroom
    app.get("/api/classes/queue/:class_id", mentor.get_inqueue); // get all assistance request
    app.post("/api/my/classes", mentor.get_my_classroom); // get all classroom referenced to the current user
    app.post("/api/my/classes/email", mentor.get_my_classroom_by_email); // get all classroom referenced to the current user by email

    // student endpoints
    app.post("/api/student/class/register", student.regToClass); // register to a open class
    app.post("/api/student/request/assistance", student.ask_assistance); // request assistance
    app.get("/api/student/queue/order/:class_id/:user_id", student.queue_order); // get the queue order number of the requested assistance
    app.post("/api/student/get/class", student.get_my_classroom);
    app.post("/api/student/classes", classes.getClassDetails);

    // class endpoints
    app.get("/api/classes", classes.getAllClass); // get all available classes
    app.get("/api/classes/students/:class_id", classes.getStudentsByClass); // get students given a class id
    app.get("/api/classes/:user_id", classes.getClassByMentor); // get class of a userid(for mentor)

    io.on("connection", socket => {
      console.log("Online");
      socket.on("disconnect", () => {
        console.log("Offline");
      });
    });
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
