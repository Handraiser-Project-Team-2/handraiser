// const secret = require("../secret");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  login: (req, res) => {
    const db = req.app.get("db");

    // const {...profileObj} = req.body;
    const {
      email,
      first_name,
      last_name,
      middle_name,
      image,
      googleId
    } = req.body;

    console.log(req.body);

    db.users
      .findOne({
        email
      })
      .then(userref => {
        if (!userref) {
          db.user_profile
            .save({
              first_name,
              last_name,
              middle_name,
              image
            })
            .then(user => {
              db.users
                .save({
                  email,
                  profile_id: user.profile_id,
                  user_type_id: 3,
                  user_status: 1
                })
                .then(data => {
                  console.log(data);

                  const token = jwt.sign({ userid: user.user_id }, secret);

                  res.status(201).json({ ...data, token });
                })
                .catch(err => {
                  console.log("here", err);
                  res.status(400).end();
                });
            })
            .catch(err => {
              console.log(err);

              res.status(400).end();
            });
        } else {
          // already sign up

          db.users
            .findOne({
              email
            })
            .then(data => {
              
              const token = jwt.sign({ googleId }, secret); // please update secret key

              res.status(201).json({ ...data, token });
            })
            .catch(err => {
              console.log(err);

              res.status(400).end();
            });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).end();
      });
  }
};
