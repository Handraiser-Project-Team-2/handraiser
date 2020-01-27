'use strict';

const _ = require('lodash');
const util = require('util');
const Entity = require('./entity');
const EventEmitter = require('events');
const SingleValueStream = require('./util/single-value-stream');

/**
 * An executable function or script.
 *
 * @class
 * @extends Entity
 * @param {Object} spec - An expanded {@linkcode Entity} specification:
 * @param {Object} spec.db - A {@linkcode Database}.
 * @param {String} spec.name - The name of the function or script.
 * @param {String} spec.schema - The owning schema or file path of the function
 * or script, respectively.
 * @param {String|QueryFile} spec.sql - A function invocation statement or a
 * pg-promise QueryFile.
 * @param {Number} spec.arity - Number of parameters the executable expects,
 * only for QueryFiles.
 * @param {Boolean} spec.isVariadic - Whether the executable accepts
 * variable-length argument lists as the last parameter, only for database
 * functions.
 * @param {Boolean} spec.enhancedFunctions - True to enable single row/value
 * results processing.
 * @param {Boolean} spec.singleRow - If true, return the first result row as an
 * object (with enhancedFunctions).
 * @param {Boolean} spec.singleValue - If true, return results as a primitive
 * or primitives (with enhancedFunctions).
 */
const Executable = function (spec) {
  Entity.apply(this, arguments);

  this.sql = spec.sql;
  this.isDatabaseFunction = Object.prototype.hasOwnProperty.call(spec, 'isVariadic');
  this.arity = spec.arity;              // only for scripts
  this.isVariadic = !!spec.isVariadic;  // only for db functions
  this.isProcedure = spec.kind === 'p'; // only for db functions
  this.singleRow = spec.enhancedFunctions && spec.singleRow;
  this.singleValue = spec.enhancedFunctions && spec.singleValue;
};

util.inherits(Executable, Entity);

/**
 * Invoke the function or script.
 *
 * @param {Object} [options] - {@link https://massivejs.org/docs/options-objects|Result processing options}.
 * @return {Promise} Execution results as an array, unless options.single is
 * toggled or enhanced functions are enabled and the function returns a single
 * value.
 */
Executable.prototype.invoke = function () {
  let statement = this.sql,
    args,
    opts = {single: this.singleRow || false};

  // arrays as the first argument are always a full parameter list, for
  // functions and scripts alike; for scripts with arity > 0, an object as the
  // first argument may be a named parameter block
  if (_.isArray(arguments[0]) || (!this.isDatabaseFunction && this.arity > 0 && _.isPlainObject(arguments[0]) && !_.isString(this.sql))) {
    args = arguments[0];
    opts = _.defaults(_.last(arguments), opts);
  } else {
    args = Array.prototype.slice.call(arguments);

    // functions don't have an arity to check, but since they can't use named
    // parameters we can just check for an object at the end of the params; for
    // scripts, options make the arguments array longer than the arity.
    if ((this.isDatabaseFunction && _.isPlainObject(_.last(args)) ||
        (!this.isDatabaseFunction && arguments.length === this.arity + 1))) {
      opts = _.defaults(args.pop(), opts);
    }
  }

  if (statement === undefined) {
    // functions can be overloaded or variadic, so we have to build the
    // statement dynamically to handle however many arguments are present at
    // call time

    const params = _.times(args.length, i => `$${i + 1}`).join(',');

    if (this.isProcedure) {
      statement = `CALL "${this.schema}"."${this.name}"(${params})`;
    } else {
      statement = `SELECT * FROM "${this.schema}"."${this.name}"(${params})`;
    }
  }

  if (args.length === 0) {
    args = undefined;
  }

  return this.db.query(statement, args, opts).then(result => {
    if (result instanceof EventEmitter && typeof result.read === 'function') {
      if (this.singleValue) { result = result.pipe(new SingleValueStream()); }

      return result;
    }

    let data = result;

    if (this.singleValue) {
      try {
        data = _.isArray(data) ? data.map(SingleValueStream.singleValue) : SingleValueStream.singleValue(data);
      } catch (e) {
        return this.db.$p.reject(e);
      }
    }

    return data;
  });
};

module.exports = Executable;
