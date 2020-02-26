/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("concern_list", {
    concern_id: {
      type: "serial",
      primaryKey: true
    },
    concern_title: {
      type: "text"
    },
    concern_description: {
      type: "text"
    },
    concern_status: {
      type: "integer",
      references: "concern_status"
    },
    class_id: {
      type: "integer",
      references: '"class"'
    },
    user_id: {
      type: "integer",
      references: '"users"'
    }
  });
};

exports.down = pgm => {};
