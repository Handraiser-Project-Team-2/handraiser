/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("key", {
    key_id: {
      type: "serial",
      primaryKey: true
    },
    key_name: {
      type: "text"
    },
    user_id: {
      type: "integer",
      references: '"users"'
    }
  });
};

exports.down = pgm => {};
