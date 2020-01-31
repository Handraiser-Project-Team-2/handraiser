/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("chatroom", {
    chatroom_id: {
      type: "serial",
      primaryKey: true
    },
    chatroom_date_created: {
      type: "text"
    },
    assisted_id: {
      type: "integer",
      references: "assisted_by"
    }
  });
};

exports.down = pgm => {};
