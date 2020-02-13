const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const massive = require("massive");
const cors = require("cors");
const router = require("./router");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// setup controllers
const users = require("./controllers/users");
const admin = require("./controllers/admins");
const classes = require("./controllers/class");
const mentor = require("./controllers/mentor");
const student = require("./controllers/student");
const authorization = require("./controllers/authorization");
const chat = require("./controllers/chat");

const mail = require("./mail");

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

    // app.use(authorization.authorization_check);

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
    app.patch("/api/users/:user_id", users.patchUserStatus); //update user_status when logged out

    // admins endpoints
    app.post("/api/admin/keygen/mentor", admin.add_mentor); //reference a mentor user type to an email
    app.post("/api/admin/keygen", admin.add_admin_mentor); //register either mentor or admin user type to an email
    app.get("/api/admin/all_list", admin.accessList); //
    app.get("/api/admin/mentor_list", admin.accessList_mentors);
    app.get("/api/admin/admins_list", admin.accessList_admins);
    app.post("/api/admin/verify", admin.verify);

    app.post("/api/admin/check/designation", admin.need_validations); // implicitly check if email need validations

    // mentor endpoints
    app.get("api/classes/all/:class_id", mentor.get_all);
    app.get("/api/classes/done/:class_id", mentor.get_done);
    app.patch(
      "/api/assistance/:assisted_id/:class_id/:user_student_id",
      mentor.done
    );
    app.get("/api/classes/all/:class_id", mentor.get_all);
    app.post("/api/mentor/classroom/add", mentor.add_classroom); // register a new classroom
    app.get("/api/classes/queue/:class_id", mentor.get_inqueue); // get all assistance request
    app.post("/api/my/classes", mentor.get_my_classroom); // get all classroom referenced to the current user
    app.post("/api/my/classes/email", mentor.get_my_classroom_by_email); // get all classroom referenced to the current user by email
    app.delete("/api/assisted_by/:user_student_id", mentor.delete); // delete from assisted_by table
    app.put("/api/mentor/my/class", mentor.edit_class); // edit a certain class

    // student endpoints
    app.get("/api/student/queue/order/:class_id", student.queue_order_all);
    app.delete("/api/student/request/:concern_id", student.delete);

    app.patch("/api/concern_list/:concern_id", student.updateConcern);
    app.post("/api/assisted_by", student.assisted_by);
    app.get(
      "/api/assisted_by/:class_id/:user_student_id",
      student.GetAssisted_by
    );
    app.get("/api/concern_list/:concern_id", student.getConcern);
    app.get("/api/student/concern_list/user/:user_id", student.getUserConcern); // get all user request

    app.post("/api/student/class/register", student.regToClass); // register to a open class
    app.post("/api/student/request/assistance", student.ask_assistance); // request assistance
    app.get("/api/student/queue/order/:class_id/:user_id", student.queue_order); // get the queue order number of the requested assistance
    app.get(
      "/api/student/done/order/:class_id/:user_id",
      student.queue_order_done
    ); // get all done request assistance
    app.post("/api/student/get/class", student.get_my_classroom);
    app.post("/api/student/classes", classes.getClassDetails);

    // class endpoints
    app.get("/api/classes", classes.getAllClass); // get all available classes
    app.get("/api/classes/students/:class_id", classes.getStudentsByClass); // get students given a class id
    app.get("/api/classes/:user_id", classes.getClassByMentor); // get class of a userid(for mentor)

    //  chat endpoints
    app.post("/api/chat/send", chat.sendMessage);
    app.get("/api/chat/convo", chat.getConversation);

    //sending email
    app.post("/api/sendMail", mail.sendEmail);

    io.on("connection", socket => {
      const users = [];

      socket.on("AddRequest", (data, callback) => {
        // console.log(data);

        io.to(data.room).emit("consolidateRequest", data);

        callback();
      });

      socket.on("handshake", data => {
        console.log("handshake flag", data)

        io.to(data.room).emit("updateComponents", {message:'handshake succesful'});
      });

      console.log("Online");

      socket.on("join", ({ username, room, image }, callback) => {
        const user = {
          id: socket.id,
          name: username,
          room: room,
          image: image
        };

        users.push(user);

        console.log("user", user);

        socket.emit("message", {
          user: "admin",
          text: `${user.name},welcome to the room ${user.room} `
        });

        socket.join(user.room);

      });

      socket.on("typing", data => {
        socket.broadcast.emit("typing", data);
      });
      socket.on("not typing", data => {
        socket.broadcast.emit("not typing", data);
      });

      socket.on("sendMessage", (message, callback) => {
        const user = users.find(user => user.id === socket.id);
        // console.log(user);
        io.to(user.room).emit("message", {
          user: user.name,
          text: message,
          image: user.image
        });

        callback();
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
