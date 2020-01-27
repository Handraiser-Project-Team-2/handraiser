'use strict';

exports = module.exports = function (db) {
  const file = db.serverAtLeast('11') ? 'functions.sql' : 'functions-legacy.sql';

  if (db.loader.excludeFunctions) { return db.$p.resolve([]); }

  return db.instance.query(db.loader.queryFiles[file], db.loader);
};
