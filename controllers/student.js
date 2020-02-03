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
        console.log(err)
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
              order_data.push({ concern, queue_order_num:index });
            }
          });
        }

        res.status(201).json(order_data);
      })
      .catch(err => {
        res.status(401).end();
      });
  }
};
