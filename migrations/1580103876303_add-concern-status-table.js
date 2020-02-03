/* eslint-disable camelcase */

exports.shorthands = undefined;
const sql = String.raw

exports.up = pgm => {
    pgm.createTable("concern_status", {
        status_id: {
            type: "serial",
            primaryKey: true
        },
        status_type:{
            type: "text"
        }
    });
    pgm.sql(sql`INSERT INTO concern_status(status_type) values ('hot')`);
    pgm.sql(sql`INSERT INTO concern_status(status_type) values ('inqueue')`);
    pgm.sql(sql`INSERT INTO concern_status(status_type) values ('closed')`);
};

exports.down = pgm => {};
