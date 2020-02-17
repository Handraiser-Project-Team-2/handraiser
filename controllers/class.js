function getStudentsByClass(req, res) {
  const db = req.app.get("db");
  const { class_id } = req.params;

  db.query(
    `SELECT
        user_profile.profile_id,
        user_profile.first_name,
        user_profile.last_name,
        user_profile.image
      FROM
        user_profile
      INNER JOIN users ON users.profile_id = user_profile.profile_id
      INNER JOIN classroom ON users.user_id = classroom.user_id where user_type_id=3 and class_id = ${class_id};`
  )
    .then(students => res.status(201).send(students))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getAllClass(req, res) {
  const db = req.app.get("db");

  db.class
    .find()
    .then(classes => res.status(200).send(classes))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getClassByMentor(req, res) {
  const db = req.app.get("db");
  const { token } = req.params;

  const parseToken = jwtDecode(token);

  db.class
    .find({ user_id: parseToken.userid })
    .then(classes => res.status(200).json(classes))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getClassDetails(req, res) {
  const db = req.app.get("db");
  const { class_id } = req.params;
  const { search } = req.query;

  db.query(
    `SELECT
        *
      FROM
        user_profile
      INNER JOIN users ON users.profile_id = user_profile.profile_id
      INNER JOIN class ON users.user_id = class.user_id where class_id = ${class_id};`
  )
    .then(detail => {
      // console.log(detail);
      // `SELECT * from ${detail} where ${detail.first_name} ILIKE '%${search}%' OR ${detail.last_name} ILIKE '%${search}%'`;
      res.status(201).json(detail);
    })
    .catch(err => {
      res.status(500).end();
    });
}

function getClassMembers(req, res) {
  const db = req.app.get("db");
  const { class_id } = req.params;
  const { search } = req.query;

  db.query(
    `SELECT
        *
      FROM
        user_profile
      INNER JOIN users ON users.profile_id = user_profile.profile_id
      INNER JOIN classroom ON users.user_id = classroom.user_id where class_id = ${class_id};`
  )
    .then(members => res.status(201).send(members))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  getAllClass,
  getStudentsByClass,
  getClassByMentor,
  getClassDetails,
  getClassMembers
};
