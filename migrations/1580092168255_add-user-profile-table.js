/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("user_profile", {
    profile_id: {
      type: "serial",
      primaryKey: true
    },
    first_name: {
      type: "text"
    },
    last_name: {
      type: "text"
    },
    image: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
