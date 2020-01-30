const keygen = require("./keyGen");

module.exports = {
  add_classroom: (req, res) => {
    const db = req.app.get("db");

    let date = new Date();

    console.log(date);

    const {
      class_title,
      class_description,
      class_status, //either (open, close)
      user_id //mentor reference
    } = req.body;

    db.class
      .save({
        user_id,
        class_title,
        class_description,
        class_date_created: date,
        class_status
      })
      .then(data => {

        // add key ref for this classroom
        db.classroom_key
          .save({
            class_id: data.class_id,
            classroom_key: keygen.genKey("", "classroom")
          })
          .then(classRef => {
            res.status(201).json({...data, classRef});
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
  }
};
