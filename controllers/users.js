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
                    { googleId, userid: user.profile_id },
                    secret
                  );
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

  patchUserStatus: (req, res) => {
    const db = req.app.get("db");

    const { user_id } = req.params;
    const { user_status } = req.body;

    db.users
      .save({ user_id, user_status })
      .then(user => res.status(200).json(user))
      .catch(err => {
        console.error(err);
        // res.status(500).end();
      });
  },

  getUser: (req, res) => {
    const db = req.app.get("db");

    const { token } = req.body;

    let parseToken = jwtDecode(token);

    db.users.findOne({ user_id: parseToken.userid }).then(data => {
      if (data) {
        db.user_profile
          .findOne({ profile_id: data.profile_id })
          .then(user => {
            res.status(201).json({ ...data, ...user });
          })
          .catch(err => {
            res.status(400).end();
          });
      }
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
  },
  accessList_student: (req, res) => {
    const db = req.app.get("db");

    db.query(
      "select * from users inner join user_profile on users.profile_id = user_profile.profile_id where user_type_id = 3"
    )
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).end();
      });
  },
  mentor_List: (req, res) => {
    const db = req.app.get("db");

    db.query(`select * from users  where user_type_id = 4;`)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).end();
      });
  },
  admin_List: (req, res) => {
    const db = req.app.get("db");

    db.query(`select * from users  where user_type_id = 2;`)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).end();
      });
  },
  getUserProfileByEmail: (req, res) => {
    const db = req.app.get("db");

    const { email } = req.body;

    db.users.findOne({ email: email }).then(data => {
      if (data) {
        db.user_profile.findOne({ profile_id: data.profile_id }).then(user => {
          if (user) {
            db.query(
              `select  COUNT(concern_id) as stud_helped from concern_list INNER JOIN class ON concern_list.class_id = class.class_id WHERE concern_list.concern_status = 3 AND class.user_id = ${data.profile_id}`
            ).then(row => {
              if (row) {
                db.query(
                  `select COUNT(classroom.classroom_id) as stud_handled from classroom INNER JOIN class ON classroom.class_id = class.class_id WHERE class.user_id = ${data.profile_id}`
                )
                  .then(stud => {
                    res
                      .status(201)
                      .json({ ...data, ...user, ...row[0], ...stud[0] });
                  })
                  .catch(err => {
                    res.status(400).end();
                  });
              }
            });
          }
        });
      }
    });
  },
  getUserProfileByStudentEmail: (req, res) => {
    const db = req.app.get("db");

    const { email } = req.body;

    db.users.findOne({ email: email }).then(data => {
      if (data) {
        db.user_profile.findOne({ profile_id: data.profile_id }).then(user => {
          if (user) {
            db.query(
              `select  COUNT(concern_id) as req_resolved from concern_list INNER JOIN class ON concern_list.class_id = class.class_id WHERE concern_list.concern_status = 3 AND concern_list.user_id = ${data.profile_id}`
            ).then(row => {
              if (row) {
                db.query(
                  `select  COUNT(concern_id) as all_request from concern_list INNER JOIN class ON concern_list.class_id = class.class_id WHERE concern_list.user_id = ${data.profile_id} AND concern_list.user_id = ${data.profile_id};`
                )
                  .then(stud => {
                    res
                      .status(201)
                      .json({ ...data, ...user, ...row[0], ...stud[0] });
                  })
                  .catch(err => {
                    res.status(400).end();
                  });
              }
            });
          }
        });
      }
    });
  },

  patchSuperAdmin: (req, res) => {
    const db = req.app.get("db");
    const { email } = req.body;

    db.users
      .update(
        {
          user_id: 1
        },
        {
          email: email
        }
      )
      .then(user => res.status(201).send(user))
      .catch(err => {
        console.err(err);
        res.status(500).end();
      });
  }
};
