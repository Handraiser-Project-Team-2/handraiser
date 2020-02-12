const keygen = require("./keyGen");
const jwtDecode = require("jwt-decode");

module.exports = {
  add_classroom: (req, res) => {
    const db = req.app.get("db");

    let date = new Date();
    const {
      class_title,
      class_description,
      // class_status, //either (open, close) ? maybe by defualt is open
      token //mentor reference
    } = req.body;
    jwtDecode(token);
    let parseToken = jwtDecode(token);
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
    const { search } = req.query;

    db.query(
      `SELECT * FROM concern_list INNER JOIN user_profile ON concern_list.user_id = user_profile.profile_id inner join users on user_profile.profile_id = users.profile_id WHERE concern_status <= 2 AND class_id = ${req.params.class_id} and concern_title ILIKE '%${search}%' order by concern_id ASC;`
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
    const { search } = req.query;

    db.query(
      `SELECT * FROM concern_list INNER JOIN user_profile ON concern_list.user_id = user_profile.profile_id inner join users on user_profile.profile_id = users.profile_id WHERE concern_status = 3 AND class_id = ${req.params.class_id} and concern_title ILIKE '%${search}%' order by concern_id ASC`
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
    const { search } = req.query;

    db.query(
      `SELECT * FROM concern_list INNER JOIN user_profile ON concern_list.user_id = user_profile.profile_id inner join users on user_profile.profile_id = users.profile_id WHERE class_id = ${req.params.class_id} and concern_title ILIKE '%${search}%' order by concern_id ASC;`
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(401).end(err);
      });
  },

  delete: (req, res) => {
    const db = req.app.get("db");

    db.assisted_by
      .destroy({
        user_student_id: req.params.user_student_id
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(401).end(err);
      });
  },

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
  },

  get_my_classroom_by_email: (req, res) => {
    const db = req.app.get("db");

    const { email } = req.body;

    db.query(
      `SELECT class.class_id, class.class_title, class.class_description, class.class_date_created, class.class_status, classroom_key.classroom_key
      FROM users INNER JOIN class ON class.user_id = users.user_id INNER JOIN classroom_key ON class.class_id = classroom_key.class_id  WHERE users.email = '${email}'`
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).end(err);
      });
  },

  edit_class: (req, res) => {
    const db = req.app.get("db");
    const { class_id, class_title, class_description } = req.body;

    db.class
      .update(
        {
          class_id: class_id
        },
        {
          class_title: class_title,
          class_description: class_description
        }
      )
      .then(classroom => res.status(201).send(classroom))
      .catch(err => {
        console.err(err);
        res.status(500).end();
      });
  }
};
