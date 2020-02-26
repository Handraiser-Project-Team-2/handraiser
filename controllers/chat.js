// const jwtDecode = require("jwt-decode");

module.exports = {
  sendMessage: (req, res) => {
    const db = req.app.get("db");

    const { user_id, message, chat_date_created, concern_id } = req.body;

    // const parseToken = jwtDecode(token);
    // const user_id = parseToken.userid;

    db.chat
      .save({
        message: message,
        chat_date_created: chat_date_created,
        concern_id: concern_id,
        user_id: user_id
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).end(err);
      });
  },
  getConversation: (req, res) => {
    const db = req.app.get("db");

    const { concern_id } = req.body;

    db.chat
      .find({
        concern_id: concern_id
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).end();
      });
  }
};
