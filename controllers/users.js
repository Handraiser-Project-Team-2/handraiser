// const secret = require("../secret");
const jwt = require("jsonwebtoken");
const secret = require("../secret");
const jwtDecode = require("jwt-decode");

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
                  const token = jwt.sign(
                    { googleId, userid: user.user_id },
                    secret
                  );

                  // console.log(jwtDecode(token));

                  res.status(201).json({ token, ...data });
                })
                .catch(err => {
                  res.status(400).end();
                });
            })
            .catch(err => {
              res.status(400).end();
            });
        } else {
          // already sign up

          db.users
            .findOne({
              email
            })
            .then(data => {
              const token = jwt.sign(
                { googleId, userid: data.user_id },
                secret
              ); // please update secret key
              res.status(201).json({ token, ...data });
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
  },
  getUser: (req, res) => {
    const db = req.app.get("db");

    const { token } = req.body;

    let parseToken = jwtDecode(token);

    db.users
      .findOne({ user_id: parseToken.userid })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).end();
      });
  },
  getUserProfile: (req, res) => {
    const db = req.app.get("db");

    const { user_id } = req.params;

    db.query(
      `SELECT * FROM user_profile inner join users on user_profile.profile_id = users.profile_id where user_id = ${user_id}`
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).end();
      });
  }
};
