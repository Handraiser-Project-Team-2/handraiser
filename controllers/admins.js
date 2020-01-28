const keygen = require("./keyGen");

module.exports = {
  add_mentor: (req, res) => {
    const db = req.app.get("db");

    const { email } = req.body;

    try {
      const keys = keygen.genKey(email);

      db.validations.find({ email }).then(data => {
        if (!data) {
          // register then
          db.validations
            .save({
              validation_email: email,
              validation_key: keys,
              validation_status: false
            })
            .then(data => {
              res.status(201).json(data);
            })
            .catch(err => {
              res.status(400).end();
            });
          res.status(201).json(data);
        } else {

          // already registered
          res.status(201).json({ remarks: "data is already registed", data });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  }
};
