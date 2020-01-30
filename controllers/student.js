module.exports = {
  regToClass: (req, res) => {
    const db = req.app.get("db");

    const { class_id, user_id, supplied_key } = req.body;

    db.classroom_key
      .findOne({ class_id })
      .then(data => {
        if (data.classroom_key === supplied_key) {
          // succesful key reference
          db.classroom
            .save({ class_id, user_id }) //add date func here
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
  }
};
