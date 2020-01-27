/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("class", {
    class_id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "integer",
      references: '"users"'
    },
    class_title: {
      type: "text"
    },
    class_description: {
      type: "text"
    },
    class_date_created: {
      type: "text"
    },
    class_status: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
