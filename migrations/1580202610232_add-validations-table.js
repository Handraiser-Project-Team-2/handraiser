/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("validations", {
    validation_id: {
      type: "serial",
      primaryKey: true
    },
    validation_key: {
      type: "text"
    },
    validation_email: {
      type: "text"
    },
    validation_status: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
