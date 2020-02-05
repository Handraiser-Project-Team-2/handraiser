const jwtDecode = require("jwt-decode");

module.exports = {
  regToClass: (req, res) => {
    const db = req.app.get("db");

    const { token, supplied_key } = req.body;

    const parseToken = jwtDecode(token);

    let date = new Date();

    db.classroom_key
      .findOne({ classroom_key: supplied_key }) // find classroom
      .then(data => {
        //check if already registered
        db.classroom
          .findOne({ class_id: data.class_id, user_id: parseToken.userid })
          .then(classref => {
            if (classref) {
              //if yes send reference data
              res.status(201).json({ ...classref });
            } else {
              //if not then register
              console.log(data);
              db.classroom
                .save({
                  class_id: data.class_id,
                  user_id: parseToken.userid,
                  date_entered: date
                }) // register to a certain class
                .then(data => {
                  res.status(201).json(data);
                })
                .catch(err => {
                  console.log(err);
                  res.status(422).end();
                });
            }
          })
          .catch(err => {
            console.log(err);
            res.status(422).end();
          });
      })
      .catch(err => {
        console.log(err);
        res.status(422).end();
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
      `SELECT * FROM concern_list WHERE concern_status = 2 AND class_id = ${req.params.class_id}`
    )
      .then(data => {
        // re:looping here please
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
  get_my_classroom: (req, res) => {
    const db = req.app.get("db");

    const { token } = req.body;

    const parseToken = jwtDecode(token);

    db.query(
      `SELECT class.class_id,  class.class_title, class.class_description, class.class_date_created, class.class_status
      FROM class INNER JOIN classroom ON classroom.class_id = class.class_id
      WHERE classroom.user_id = ${parseToken.userid}`
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).end();
      });
  }
};
