/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("chat", {
    chat_id: {
      type: "serial",
      primaryKey: true
    },
    message: {
      type: "text"
    },
    chat_date_created: {
      type: "text"
    },
    user_id: {
      type: "integer",
      references: "users"
    },
    chatroom_id: {
      type: "integer",
      references: "chatroom"
    }
  });
};

exports.down = pgm => {};
