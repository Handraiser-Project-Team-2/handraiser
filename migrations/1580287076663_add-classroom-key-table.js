/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("classroom_key", {
        classkey_id: {
            type: "serial",
            primaryKey: true
        },
        classroom_key: {
            type:"text",
        },
        class_id: {
            type:"integer",
            references: "class"
        }
    })
}; 

exports.down = pgm => {};
