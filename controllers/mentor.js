const keygen = require("./keyGen");
const jwtDecode = require("jwt-decode");

module.exports = {
  add_classroom: (req, res) => {
    const db = req.app.get("db");

    let date = new Date();

    console.log(date);

   
    const {
      class_title,
      class_description,
      class_status, //either (open, close) ? maybe by defualt is open
      token //mentor reference
    } = req.body;

    jwtDecode(token);
    let parseToken = jwtDecode(token);


    db.class
      .save({
        user_id:parseToken.user_id,
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
            res.status(201).json({ ...data, classRef });
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
  },
  get_inqueue: (req, res) => {
    const db = req.app.get("db");

    db.concern_list
      .find({ class_id: req.params.class_id })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(401).end(err);
      });
  },
  get_my_classroom: (req, res) => {
    const db = req.app.get("db");

    const {token} = req.body

    const parseToken = jwtDecode(token);

    db.class.find({user_id:parseToken.userid})
      .then(data=>{
        res.status(201).json(data);
      })
      .catch(err=>{
        res.status(400).end(err)
      })

    // res.status(201).json(parseToken)
    
  }
};
