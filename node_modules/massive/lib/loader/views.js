'use strict';

exports = module.exports = function (db) {
  const file = db.serverAtLeast('9.3') && db.loader.excludeMatViews !== true ? 'views.sql' : 'views-legacy.sql';

  return db.instance.query(db.loader.queryFiles[file], db.loader);
};
