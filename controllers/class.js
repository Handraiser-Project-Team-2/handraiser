function getStudentsByClass(req, res) {
  const db = req.app.get("db");
  const { class_id } = req.params;

  db.query(
    `SELECT
        user_profile.profile_id,
        user_profile.first_name,
        user_profile.last_name,
        user_profile.middle_name,
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
  const { user_id } = req.params;

  db.class
    .find({ user_id })
    .then(classes => res.status(200).send(classes))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  getAllClass,
  getStudentsByClass,
  getClassByMentor
};
