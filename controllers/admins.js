const keygen = require("./keyGen");

module.exports = {
  // generate key to an email input (setting/promoting to mentor)
  add_mentor: (req, res) => {
    const db = req.app.get("db");

    const { email } = req.body;

    try {
      const keys = keygen.genKey(email, "mentor");

      db.validations
        .find({ validation_email: email })
        .then(data => {
          console.log(!data);

          if (!data || data.length === 0) {
            // register then
            db.validations
              .save({
                validation_email: email,
                validation_key: keys,
                validation_status: false,
                validation_type: 4
              })
              .then(data => {
                res.status(201).json(data);
              })
              .catch(err => {
                console.log(err);
                res.status(400).end();
              });
          } else {
            // already registered
            res.status(201).json({ remarks: "data is already registed", data });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(400).end();
        });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  },
  accessList: (req, res) => {
    const db = req.app.get("db");

    db.validations
      .find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).end();
      });
  },
  accessList_mentors: (req, res) => {
    const db = req.app.get("db");

    db.validations
    .find({validation_type: 4})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).end();
    });
    
  },
  accessList_admins: (req, res) => {
    const db = req.app.get("db");

    db.validations
    .find({validation_type: 1})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).end();
    });
  },
  // for super admin
  // generate key to an email input (setting/promoting to user type)
  add_admin_mentor: (req, res) => {
    const db = res.app.get("db");

    const { email, type } = req.body;

    let setType = 0;
    if (type === "admin") setType = 1;
    if (type === "mentor") setType = 4;

    // check email if already defined
    try {
      db.validations
        .find({ validation_email: email })
        .then(data => {
          console.log(!data);

          const keys = keygen.genKey(email, type);

          if (!data || data.length === 0) {
            // register then
            db.validations
              .save({
                validation_email: email,
                validation_key: keys,
                validation_status: false,
                validation_type: setType
              })
              .then(data => {
                res.status(201).json(data);
              })
              .catch(err => {
                res.status(400).end();
              });
          } else {
            // already registered
            res.status(201).json({ remarks: "data is already registed", data });
          }
        })
        .catch(err => {
          res.status(400).end();
        });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  },
  // admin and mentor key verifications
  verify: (req, res) => {
    const db = res.app.get("db");

    const { userid, supplied_key } = req.body;

    db.users
      .findOne({ user_id: userid })
      .then(data => {
        console.log(data.email);

        db.validations.findOne({ validation_email: data.email }).then(user => {
          if (user.validation_key === supplied_key) {
            // then verify status
            db.query(
              `UPDATE validations
            SET validation_status = 'true'
            WHERE validation_email = '${data.email}'`
            )
              .then(validate => {
                console.log(validate);

                res
                  .status(201)
                  .json({ ...user, result: "Validation succesful" });
              })
              .catch(err => {
                console.log(err);
                res.status(400).end();
              });
          } else {
            res.status(500).json({ result: "Invalid key supplied" });
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).end();
      });
  },
  // does this userid need validations? (anything under a student user type)
  need_validations: (req, res) => {
    const db = res.app.get("db");

    const { userid } = req.body;

    db.users
      .findOne({ user_id: userid })
      .then(data => {
        db.validations
          .findOne({ validation_email: data.email })
          .then(user => {
            user.validation_status === "true"
              ? res.status(201).json(false)
              : res.status(201).json(true);
          })
          .catch(err => {
            console.log(err);
            res.status(400).end();
          });
      })
      .catch(err => {
        console.log(err);
        res.status(400).end();
      });
  }
};
