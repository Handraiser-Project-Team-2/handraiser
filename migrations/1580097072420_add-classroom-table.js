/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("classroom", {
    classroom_id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "integer",
      references: '"users"'
    },
    class_id: {
      type: "integer",
      references: '"class"'
    },
    date_entered: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
