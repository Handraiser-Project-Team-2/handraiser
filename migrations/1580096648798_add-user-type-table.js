/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("user_types", {
    user_type_id: {
      type: "serial",
      primaryKey: true
    },
    user_type: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
