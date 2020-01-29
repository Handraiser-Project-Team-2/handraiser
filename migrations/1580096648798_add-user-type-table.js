/* eslint-disable camelcase */
exports.shorthands = undefined;
const sql = String.raw
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
  pgm.sql(sql`INSERT INTO user_types(user_type) values('superadmin')`);
  pgm.sql(sql`INSERT INTO user_types(user_type) values('admin')`);
  pgm.sql(sql`INSERT INTO user_types(user_type) values('student')`);
  pgm.sql(sql`INSERT INTO user_types(user_type) values('mentor')`);
};
exports.down = pgm => {};