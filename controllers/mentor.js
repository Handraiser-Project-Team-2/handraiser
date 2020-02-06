const keygen = require("./keyGen");
const jwtDecode = require("jwt-decode");

module.exports = {
  add_classroom: (req, res) => {
    const db = req.app.get("db");

    let date = new Date();

    console.log(date);

    const {
      class_title,
      class_description,
      // class_status, //either (open, close) ? maybe by defualt is open
      token //mentor reference
    } = req.body;

    jwtDecode(token);
    let parseToken = jwtDecode(token);
    console.log(parseToken);

    db.class
      .save({
        user_id: parseToken.userid,
        class_title,
        class_description,
        class_date_created: date,
        class_status: "open" //by default
      })
      .then(data => {
        // add key ref for this classroom
        db.classroom_key
          .save({
            class_id: data.class_id,
            classroom_key: keygen.genKey("", "classroom")
          })
          .then(classRef => {
            res.status(201).json({ ...data, classRef });
          })
          .catch(err => {
            res
              .status(400)
              .json(err)
              .end();
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  get_inqueue: (req, res) => {
    const db = req.app.get("db");

    // db.concern_list
    //   .find({ class_id: req.params.class_id })
    db.query(
      `SELECT * FROM concern_list WHERE concern_status <= 2 AND class_id = ${req.params.class_id} order by concern_id ASC`
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(401).end(err);
      });
  },
  get_done: (req, res) => {
    const db = req.app.get("db");
    db.query(
      `SELECT * FROM concern_list WHERE concern_status = 3 AND class_id = ${req.params.class_id} order by concern_id ASC`
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(401).end(err);
      });
  },
  get_all: (req, res) => {
    const db = req.app.get("db");
    db.query(
      `SELECT * FROM concern_list WHERE class_id = ${req.params.class_id} order by concern_id ASC`
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(401).end(err);
      });
  },

  // delete: (req, res) => {
  //   const db = req.app.get("db");

  //   db.assisted_by
  //     .destroy({
  //       class_id: req.params.class_id,
  //       user_student_id: req.params.user_student_id
  //     })
  //     .then(data => {
  //       res.status(201).json(data);
  //     })
  //     .catch(err => {
  //       res.status(401).end(err);
  //     });
  // },

  done: (req, res) => {
    const db = req.app.get("db");
    const { assisted_id, user_student_id, class_id } = req.params;
    const { assist_status } = req.body;

    db.assisted_by
      .save({
        assisted_id,
        user_student_id,
        class_id,
        assist_status
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(401).end(err);
      });
  },

  get_my_classroom: (req, res) => {
    const db = req.app.get("db");

    const { token } = req.body;

    const parseToken = jwtDecode(token);

    db.query(
      `SELECT class.class_id, class.class_title, class.class_description, class.class_date_created, class.class_status, classroom_key.classroom_key
      FROM class INNER JOIN classroom_key ON class.class_id = classroom_key.class_id WHERE class.user_id = ${parseToken.userid}`
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).end(err);
      });
  }
};
