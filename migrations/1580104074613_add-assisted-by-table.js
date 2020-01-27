/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("assisted_by", {
    assisted_id: {
      type: "serial",
      primaryKey: true
    },
    assist_status: {
      type: "text"
    },
    class_id: {
      type: "integer",
      references: '"class"'
    },
    user_mentor_id: {
      type: "integer",
      references: '"users"'
    },
    user_student_id: {
      type: "integer",
      references: '"users"'
    }
  });
};

exports.down = pgm => {};
