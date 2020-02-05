const jwtDecode = require("jwt-decode");

module.exports = {
  regToClass: (req, res) => {
    const db = req.app.get("db");

    const { class_id, token, supplied_key } = req.body;

    const parseToken = jwtDecode(token);

    let date = new Date();

    db.classroom_key
      .findOne({ class_id })
      .then(data => {
        if (data.classroom_key === supplied_key) {
          // succesful key reference
          db.classroom
            .save({ class_id, user_id: parseToken.userid, date_entered: date }) //add date func here
            .then(data => {
              res.status(201).json(data);
            })
            .catch(err => {
              res
                .status(500)
                .json(data)
                .end(); //check here
            });
        } else {
          res.status(401).json({ result: "key is invalid" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json(data)
          .end(); //check here
      });
  },
  ask_assistance: (req, res) => {
    const db = req.app.get("db");

    const { class_id, user_id, concern_title, concern_description } = req.body;

    db.concern_list
      .save({
        class_id,
        user_id,
        concern_title,
        concern_description,
        concern_status: 2 //inqueue by default
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(401).end();
      });
  },
  queue_order: (req, res) => {
    const db = req.app.get("db");

    db.query(
      `SELECT * FROM concern_list WHERE concern_status <= 2 AND class_id = ${req.params.class_id} order by concern_id ASC`
    )
      .then(data => {
        console.log(data);
        let order_data = [];

        if (data) {
          data.map((concern, index) => {
            // filter concern by current user
            if (parseInt(concern.user_id) === parseInt(req.params.user_id)) {
              // then get its index for determining queue order
              order_data.push({ concern, queue_order_num: index });
            }
          });
        }

        res.status(201).json(order_data);
      })
      .catch(err => {
        res.status(401).end();
      });
  },
  queue_order_all: (req, res) => {
    const db = req.app.get("db");

    db.query(
      `SELECT * FROM concern_list WHERE concern_status <= 2 AND class_id = ${req.params.class_id} order by concern_id ASC`
    )
      .then(data => {
        console.log(data);
        let order_data = [];

        if (data) {
          data.map((concern, index) => {
            // filter concern by current user
            // if (parseInt(concern.user_id) === parseInt(req.params.user_id)) {
            // then get its index for determining queue order
            order_data.push({ concern, queue_order_num: index });
            // }
          });
        }

        res.status(201).json(order_data);
      })
      .catch(err => {
        res.status(401).end();
      });
  },
  // updateConcernStatus
  updateConcern: (req, res) => {
    const db = req.app.get("db");
    const { concern_id } = req.params;
    const { concern_status } = req.body;
    db.concern_list
      .save({
        concern_id,
        concern_status
      })
      .then(concern => res.status(200).json(concern))
      .catch(err => {
        console.error(err);
        // res.status(500).end();
      });
  },

  //assisted_by
  assisted_by: (req, res) => {
    const db = req.app.get("db");
    const {
      assist_status,
      class_id,
      user_mentor_id,
      user_student_id
    } = req.body;
    db.assisted_by
      .insert({
        assist_status,
        class_id,
        user_mentor_id,
        user_student_id
      })
      .then(concern => res.status(200).json(concern))
      .catch(err => {
        console.error(err);
        // res.status(500).end();
      });
  },

  //getassisted_by
  GetAssisted_by: (req, res) => {
    const db = req.app.get("db");
    const { user_student_id } = req.params;
    db.assisted_by
      .find({ user_student_id })
      .then(assist => res.status(200).json(assist))
      .catch(err => {
        console.error(err);
        // res.status(500).end();
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");

    db.concern_list
      .destroy({
        concern_id: req.params.concern_id
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(401).end(err);
      });
  },

  // updateConcern/Request
  updateConcern: (req, res) => {
    const db = req.app.get("db");
    const { concern_id } = req.params;
    const { concern_title, concern_description, concern_status } = req.body;
    db.concern_list
      .save({
        concern_id,
        concern_title,
        concern_description,
        concern_status
      })
      .then(concern => res.status(200).json(concern))
      .catch(err => {
        console.error(err);
        // res.status(500).end();
      });
  },
  // getConcern
  getConcern: (req, res) => {
    const db = req.app.get("db");
    const { concern_id } = req.params;

    db.concern_list
      .find({
        concern_id
      })
      .then(concern => res.status(200).json(concern))
      .catch(err => {
        console.error(err);
        // res.status(500).end();
      });
  },
  // getConcernPerUser
  getUserConcern: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;

    db.concern_list
      .find({
        user_id
      })
      .then(concern => res.status(200).json(concern))
      .catch(err => {
        console.error(err);
        // res.status(500).end();
      });
  }
};
