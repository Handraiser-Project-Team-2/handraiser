/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("users", {
    user_id: {
      type: "serial",
      primaryKey: true
    },
    email: {
      type: "text"
    },
    profile_id: {
      type: "integer",
      references: '"user_profile"'
    },
    user_type_id: {
      type: "integer",
      references: '"user_types"',
      onDelete: "CASCADE"
    },
    user_status: {
      type: "integer"
    }
  });
};

exports.down = pgm => {};
